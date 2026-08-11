# 🕌 আল কুরআন (Al Quran) Desktop

[![Version](https://img.shields.io/badge/version-1.0.0-emerald.svg)](https://github.com/anumhosen/al-quran)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg)](https://tauri.app/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![SQLite](https://img.shields.io/badge/Database-SQLite3-003b57.svg)](https://www.sqlite.org/)
[![Publisher](https://img.shields.io/badge/Publisher-Anum%20Hosen-orange.svg)](mailto:anumhosen@gmail.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<p align="center">
  <img src="screenshot/home.PNG" alt="Al Quran Desktop Home Screen" width="100%" style="border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);" />
</p>

**আল কুরআন (Al Quran) Desktop** হলো **Greentech Apps Foundation (GTAF)** কুরআনিক অ্যাপস দ্বারা অনুপ্রাণিত একটি আধুনিক, দ্রুত, অত্যন্ত শক্তিশালী এবং ডেক্সটপ উপযোগী অফলাইন কুরআন অ্যাপ্লিকেশন। এটি শব্দে শব্দে অনুবাদ, একাধিক তাফসীর, রিয়েল-টাইম অডিও ওয়ার্ড হাইলাইটিং, ব্যাকরণ ও শব্দমূল অনুসন্ধান, বিষয়ভিত্তিক কুরআন এবং ভার্চুয়াল আরবি কীবোর্ড সংবলিত একটি পূর্ণাঙ্গ কুরআনিক প্ল্যাটফর্ম।

---

## ✨ অ্যাপের মূল বৈশিষ্ট্যসমূহ (Features)

- 📖 **১১৪ সূরা ইনডেক্স ও গ্রিড ভিউ**: ১১৪টি সূরার আরবি, বাংলা ও ইংরেজি নাম, আয়াত সংখ্যা, মক্কী/মাদানী ট্যাগ এবং ফিল্টার সহ সাজানো হোম পেজ।
- 🔤 **শব্দে শব্দে অর্থ (Word-by-Word)**: `words.db` ও `corpus.db` সমন্বয়ে আরবি শব্দের নিখুঁত উচ্চারণ ও অনুবাদ (বাংলা, ইংরেজি, ইন্দোনেশিয়ান) এবং RTL (ডান-থেকে-বাম) এলাইনমেন্ট।
- ⏱️ **রিয়েল-টাইম অডিও ওয়ার্ড হাইলাইটিং**: মিশারী রশিদ আল-আফাসীর তেলাওয়াত চলাকালীন মিলিসেকেন্ড অনুযায়ী সরাসরি শব্দে শব্দে গোল্ডেন/ইমারেল্ড হাইলাইটিং।
- 🔊 **লোকাল ও অনলাইন অডিও পাথ সিলেক্টর**: লোকাল অডিও স্টোরেজ ফোল্ডার  নির্বাচন অথবা অনলাইন EveryAyah CDN অটোমেটিক স্ট্রিম।
- 📚 **বহুভাষিক অনুবাদ (Multiple Translations)**: বায়েন ফাউন্ডেশন (বাংলা), তাইসিরুল কুরআন (বাংলা), মুজিবুর রহমান (বাংলা), ফজলুর মজিদ (বাংলা), সহীহ ইন্টারন্যাশনাল (ইংরেজি) ইত্যাদি।
- 📖 **বিস্তারিত তাফসীর গ্রন্থ (Tafsir Reader)**: তাফসীরে ইবনে কাছীর (বাংলা/আরবি), তাফসীর আবু বকর জাকারিয়া, তাফসীরে বয়ান, আল-মুখতাসার।
- 🧠 **কুরআনিক গ্রামার ও শব্দমূল (Grammar & Root Morphology)**: আরবি মূল বর্ণ (Arabic Root), Lemma এবং Verb Forms রূপান্তর দেখার সুবিধা।
- 📖 **কুরআন অভিধান ও অন-স্ক্রিন আরবি কীবোর্ড**: আরবি মূল শব্দ বা বাংলা/ইংরেজি অর্থ দিয়ে অভিধান অনুসন্ধান এবং সরাসরি অন-স্ক্রিন আরবি ভার্চুয়াল কীবোর্ডে টাইপ করার সুবিধা।
- 📚 **বিষয়ভিত্তিক কুরআন (Subjectwise Quran Topics)**: ঈমান, সালাত, দু'আ, নবীগণ এবং পরকাল সহ ৩০০+ বিষয়ভিত্তিক কুরআনের আয়াত সংকলন (`qurantopics.db`)।
- 🔍 **তাৎক্ষণিক লাইভ সার্চ**: অনুবাদ ও আরবি পাঠে সরাসরি কীওয়ার্ড এবং আয়াত নম্বর দিয়ে অনুসন্ধানের সুবিধা।
- 🔖 **বুকমার্ক ও লাস্ট রিড ট্র্যাকার**: প্রিয় আয়াত সংরক্ষণ এবং সর্বশেষ পঠিত স্থান থেকে দ্রুত পড়া শুরু করার ফিচার।
- 🎨 **ফন্ট কাস্টমাইজেশন ও থিম**: ৯টি আরবি ফন্ট (`Kitab`, `AmiriQuran`, `MeQuran`, `Lateef`, `NotoNaskhArabic`, `NooreHidayat`, `NooreHira`, `NooreHuda`, `Qalam`) এবং ৪টি বাংলা ফন্ট (`Kalpurush`, `AnekBangla`, `Mina`, `NotoSerifBengali`), Emerald, Dark ও Sepia থিম।
- 🦀 **Tauri v2 + Rust ব্যাকএন্ড**: অত্যন্ত হালকা র‍্যাম ব্যবহার (৩০-৫০ MB), মডিউল আর্কিটেকচার (<২০০ লাইন প্রতি ফাইল) এবং ফাস্ট লোডিং।

---

## 🛠️ প্রযুক্তি (Tech Stack)

- **ডেক্সটপ ফ্রেমওয়ার্ক**: [Tauri v2](https://tauri.app/) (Rust)
- **ডাটাবেজসমূহ**: SQLite3 (`ar_quran.db`, `words.db`, `corpus.db`, `bn_bayaan.db`, `en_sahih.db`, `bn_tafsir_kathir.db`, `qurantopics.db`, `mishari_alafasy.db`)
- **ফ্রন্টএন্ড ফ্রেমওয়ার্ক**: React 19 + Vite 7
- **স্টাইলিং**: Tailwind CSS v4
- **স্টেট ম্যানেজমেন্ট**: Zustand
- **আইকনস**: React Icons (`react-icons/fa`)

---

## 🚀 লোকাল ডেভেলপমেন্ট ও বিল্ড নির্দেশিকা

### পূর্বশর্তসমূহ (Prerequisites)
- [Node.js](https://nodejs.org/) (v18+)
- [Rust & Cargo](https://www.rust-lang.org/)

### ইন্সটলেশন ও রান (Running Locally)

1. **ডিপেন্ডেন্সি ইন্সটল করুন**:
   ```bash
   npm install
   ```

2. **ডেভেলপমেন্ট মোডে অ্যাপ রান করুন**:
   ```bash
   npm run tauri dev
   ```

3. **প্রোডাকশন `.exe` ইনস্টলার তৈরি করুন**:
   ```bash
   npm run tauri build
   ```
   *বিল্ড সম্পন্ন হলে ইনস্টলার ফাইলটি `src-tauri/target/release/bundle/nsis/` ফোল্ডারে পাওয়া যাবে।*

---

## 👨‍💻 লেখক ও প্রকাশক তথ্য (Author & Publisher)

- **লেখক/প্রকাশক**: **Anum Hosen**
- **ইনস্টিটিউট**: যশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (JUST), পদার্থবিজ্ঞান বিভাগ
- **ইমেইল**: [anumhosen@gmail.com](mailto:anumhosen@gmail.com)
- **ফেসবুক**: [Anum Hosen Shawon](https://www.facebook.com/anumhosen80/)
- **ফ্রিল্যান্সার**: [@anumhosen](https://www.freelancer.com/u/anumhosen)

---

## 📜 কৃতজ্ঞতা স্বীকার (Acknowledgements)

- কুরআনের টেক্সট, অনুবাদ, তাফসীর ও ডাটাবেজ রিসোর্স [Greentech Apps Foundation (GTAF)](https://gtaf.org/) থেকে অনুপ্রাণিত ও সংগৃহীত।
- ওপেন সোর্স MIT লাইসেন্সের অধীনে প্রকাশিত।
