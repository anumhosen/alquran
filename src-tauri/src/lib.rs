use rusqlite::{Connection, OpenFlags, types::ValueRef};
use serde_json::{Map, Value};
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Emitter, Manager, Window};

#[tauri::command]
fn db_query(app_handle: AppHandle, db_name: Option<String>, query: String) -> Result<Vec<Value>, String> {
    let target_db = db_name.unwrap_or_else(|| "ar_quran.db".to_string());
    let mut db_path = app_handle
        .path()
        .resource_dir()
        .unwrap_or_default()
        .join("assets")
        .join(&target_db);

    if !db_path.exists() {
        let fallback = PathBuf::from("assets").join(&target_db);
        if fallback.exists() {
            db_path = fallback;
        } else {
            let fallback_src = PathBuf::from("src-tauri/assets").join(&target_db);
            if fallback_src.exists() {
                db_path = fallback_src;
            }
        }
    }

    let conn = Connection::open_with_flags(&db_path, OpenFlags::SQLITE_OPEN_READ_ONLY)
        .map_err(|e| format!("Failed to open DB at {:?}: {}", db_path, e))?;

    let mut stmt = conn.prepare(&query).map_err(|e| format!("Failed to prepare query: {}", e))?;
    let col_names: Vec<String> = stmt.column_names().into_iter().map(String::from).collect();

    let rows = stmt
        .query_map([], |row| {
            let mut map = Map::new();
            for (i, name) in col_names.iter().enumerate() {
                let val_ref = row.get_ref(i)?;
                let val = match val_ref {
                    ValueRef::Null => Value::Null,
                    ValueRef::Integer(n) => Value::Number(n.into()),
                    ValueRef::Real(f) => serde_json::Number::from_f64(f)
                        .map(Value::Number)
                        .unwrap_or(Value::Null),
                    ValueRef::Text(t) => Value::String(String::from_utf8_lossy(t).into_owned()),
                    ValueRef::Blob(b) => Value::Array(b.iter().map(|&byte| Value::Number(byte.into())).collect()),
                };
                map.insert(name.clone(), val);
            }
            Ok(Value::Object(map))
        })
        .map_err(|e| format!("Failed to execute query map: {}", e))?;

    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| format!("Error fetching row: {}", e))?);
    }
    Ok(result)
}

#[tauri::command]
fn select_audio_folder() -> Result<Option<String>, String> {
    let output = std::process::Command::new("powershell")
        .args(&[
            "-NoProfile",
            "-STA",
            "-Command",
            "[System.Reflection.Assembly]::LoadWithPartialName('System.windows.forms') | Out-Null; $f = New-Object System.Windows.Forms.FolderBrowserDialog; $f.Description = 'Select Audio Storage Directory'; $f.ShowNewFolderButton = $true; if ($f.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { Write-Output $f.SelectedPath }"
        ])
        .output()
        .map_err(|e| e.to_string())?;

    let path = String::from_utf8_lossy(&output.stdout).trim().to_string();
    if path.is_empty() {
        Ok(None)
    } else {
        Ok(Some(path))
    }
}

#[tauri::command]
fn get_default_audio_dir(app_handle: AppHandle) -> Result<String, String> {
    let dir = app_handle.path().app_local_data_dir().unwrap_or_default();
    Ok(dir.to_string_lossy().to_string())
}

#[tauri::command]
fn save_audio_file(folder_path: String, filename: String, data: Vec<u8>) -> Result<(), String> {
    let path = PathBuf::from(&folder_path);
    if !path.exists() {
        fs::create_dir_all(&path).map_err(|e| format!("Failed to create folder {:?}: {}", path, e))?;
    }
    let file_path = path.join(filename);
    fs::write(&file_path, data).map_err(|e| format!("Failed to write file {:?}: {}", file_path, e))?;
    Ok(())
}

#[tauri::command]
fn check_audio_file_exists(folder_path: String, filename: String) -> Result<bool, String> {
    let file_path = PathBuf::from(folder_path).join(filename);
    Ok(file_path.exists())
}

#[tauri::command]
fn minimize_window(window: Window) -> Result<(), String> { window.minimize().map_err(|e| e.to_string()) }
#[tauri::command]
fn toggle_maximize_window(window: Window) -> Result<(), String> {
    if window.is_maximized().map_err(|e| e.to_string())? { window.unmaximize().map_err(|e| e.to_string()) }
    else { window.maximize().map_err(|e| e.to_string()) }
}
#[tauri::command]
fn close_window(window: Window) -> Result<(), String> { window.close().map_err(|e| e.to_string()) }
#[tauri::command]
fn is_window_maximized(window: Window) -> Result<bool, String> { window.is_maximized().map_err(|e| e.to_string()) }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            if let Some(main_window) = app.get_webview_window("main") {
                let window_clone = main_window.clone();
                main_window.on_window_event(move |event| {
                    if let tauri::WindowEvent::Resized(_) = event {
                        if let Ok(is_max) = window_clone.is_maximized() {
                            let _ = window_clone.emit("window:isMaximized", is_max);
                        }
                    }
                });
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            db_query,
            select_audio_folder,
            get_default_audio_dir,
            save_audio_file,
            check_audio_file_exists,
            minimize_window,
            toggle_maximize_window,
            close_window,
            is_window_maximized
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
