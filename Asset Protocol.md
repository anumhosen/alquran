# Implementation Plan - Local Audio File Loading Fix in Tauri v2

This plan details every possible method to resolve the WebView2 security restriction:
`Not allowed to load local resource: file:///C:/Users/anum/Music/Al%20Quran/audio/mishari_alafasy/034.mp3`

---

## 🔍 Root Cause Analysis

Modern WebViews (Chromium / WebView2 on Windows) block the direct loading of `file://` URLs from web origins (`http://localhost` or `tauri://localhost`) due to strict browser security policies. 

Direct `file:///` URLs specified in HTML5 `<audio src="file:///...">` tags are blocked by default.

---

## 🚀 Possible Solutions

### Option 1: Using Tauri v2 `convertFileSrc` + Asset Protocol (Recommended Official Method)

Tauri v2 provides a built-in API `convertFileSrc()` from `@tauri-apps/api/core` designed specifically for referencing local filesystem files in media tags (`<audio>`, `<img>`, `<video>`).

#### Proposed Changes:
1. **Configure Asset Protocol Scope** in [`src-tauri/tauri.conf.json`](file:///d:/Development/TAURI/Al%20Quran/src-tauri/tauri.conf.json):
   ```json
   "app": {
     "security": {
       "csp": null,
       "assetProtocol": {
         "enable": true,
         "scope": ["**"]
       }
     }
   }
   ```
2. **Use `convertFileSrc` in Audio Engine** [`src/components/AudioPlayerBar.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/AudioPlayerBar.jsx):
   ```javascript
   import { convertFileSrc } from '@tauri-apps/api/core';

   const getAudioUrl = (s, a) => {
       if (!useFallbackOnline && audioSourceMode === 'local' && audioFolderPath) {
           const fullPath = `${audioFolderPath}/${padNumber(s)}.mp3`;
           return convertFileSrc(fullPath); 
           // Outputs: http://asset.localhost/C%3A/Users/anum/Music/Al%20Quran/audio/mishari_alafasy/034.mp3
       }
       return `https://everyayah.com/data/Alafasy_128kbps/${padNumber(s)}${padNumber(a)}.mp3`;
   };
   ```

- **Advantages**: Built-in, zero runtime overhead, supports native HTTP range requests/audio seeking.
- **Disadvantages**: Requires asset protocol configuration in `tauri.conf.json`.

---

### Option 2: Rust Command + JS Blob Object URL (Robust Memory Fallback)

If WebView asset protocols are restricted, Rust reads the local file bytes and sends them to JavaScript to construct an in-memory `Blob` URL (`URL.createObjectURL`).

#### Proposed Changes:
1. **Add Rust Command** in [`src-tauri/src/lib.rs`](file:///d:/Development/TAURI/Al%20Quran/src-tauri/src/lib.rs):
   ```rust
   #[tauri::command]
   fn read_audio_file_bytes(file_path: String) -> Result<Vec<u8>, String> {
       std::fs::read(&file_path).map_err(|e| e.to_string())
   }
   ```
2. **Convert to Blob URL in JS** [`src/components/AudioPlayerBar.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/AudioPlayerBar.jsx):
   ```javascript
   const bytes = await tauriAPI.readAudioFileBytes(filePath);
   const blob = new Blob([new Uint8Array(bytes)], { type: 'audio/mpeg' });
   const blobUrl = URL.createObjectURL(blob);
   audioRef.current.src = blobUrl;
   ```

- **Advantages**: 100% immune to browser protocol security restrictions.
- **Disadvantages**: Loads audio file into RAM before playing.

---

### Option 3: Custom Rust URI Protocol (`stream://` or `local-audio://`)

Register a custom protocol in Rust `lib.rs` that intercepts `audio://` or `stream://` requests and streams local files.

#### Proposed Changes:
1. **Register Protocol in Rust Setup** [`src-tauri/src/lib.rs`](file:///d:/Development/TAURI/Al%20Quran/src-tauri/src/lib.rs):
   ```rust
   tauri::Builder::default()
       .register_uri_scheme_protocol("audio", move |_app, request| {
           let path = urlencoding::decode(request.uri().path()).unwrap();
           match std::fs::read(path.as_ref()) {
               Ok(data) => http::Response::builder()
                   .header("Content-Type", "audio/mpeg")
                   .body(data),
               Err(_) => http::Response::builder().status(404).body(vec![]),
           }
       })
   ```
2. **Audio URL Format**:
   `audio://C:/Users/anum/Music/Al%20Quran/audio/mishari_alafasy/034.mp3`

- **Advantages**: Full control over HTTP headers and range requests.
- **Disadvantages**: Requires protocol handler logic in Rust.

---

### Option 4: Embedded Local Rust Web Server (HTTP Proxy)

Spin up an internal `std::net` / HTTP server on `127.0.0.1:<port>` in Rust serving local files.

- **Advantages**: Standard `http://127.0.0.1:port/034.mp3` format.
- **Disadvantages**: Unnecessary complexity for local files.

---

## 🎯 Recommended Technical Choice

**Option 1 (`convertFileSrc` + assetProtocol scope)** is the standard, official Tauri v2 solution. Option 2 can be added as a fallback method if any path permissions fail.

---

## 📝 User Review Required

> [!IMPORTANT]
> Option 1 (`convertFileSrc`) is the cleanest and most efficient approach for Tauri v2 desktop apps. Option 2 (Blob URL via Rust bytes) is also ready if you prefer memory-buffered loading.

---

## 🧪 Verification Plan

### Manual Verification
1. Select local audio directory containing MP3 files.
2. Play Surah audio.
3. Verify local audio plays smoothly without console `Not allowed to load local resource` errors.
4. Verify word-by-word real-time highlighting functions seamlessly.
