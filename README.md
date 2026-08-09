# 🕌 হিসনুল মুসলিম (Hisnul Muslim) Desktop

[![Version](https://img.shields.io/badge/version-1.0.0-emerald.svg)](https://github.com/anumhosen/al-quran)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg)](https://tauri.app/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![SQLite](https://img.shields.io/badge/Database-SQLite3-003b57.svg)](https://www.sqlite.org/)
[![Publisher](https://img.shields.io/badge/Publisher-Anum%20Hosen-orange.svg)](mailto:anumhosen@gmail.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<p align="center">
  <img src="screenshot/home.PNG" alt="Hisnul Muslim Desktop Home Screen" width="100%" style="border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);" />
</p>

**হিসনুল মুসলিম (Hisnul Muslim)** হলো কুরআন ও সুন্নাহ ভিত্তিক দৈনন্দিন জীবনের সকল বিশুদ্ধ দু'আ ও জিকির সম্বলিত একটি আধুনিক, দ্রুত, এবং অত্যন্ত হালকা অফলাইন ডেক্সটপ অ্যাপ্লিকেশন।

---

## ✨ অ্যাপের মূল বৈশিষ্ট্যসমূহ (Features)

- 📖 **বিশুদ্ধ দু'আ সংকলন**: হিসনুল মুসলিমের সকল ক্যাটাগরি ও অধ্যায়ের প্রাত্যহিক দু'আ ও জিকির।
- 🔤 **শব্দে শব্দে অর্থ (Word-by-Word)**: আরবি প্রতিটি শব্দের পৃথক বাংলা অনুবাদ দেখার ইন্টারঅ্যাক্টিভ RTL ব্যবস্থা।
- 🔍 **তাৎক্ষণিক লাইভ সার্চ**: আরবি পাঠ, উচ্চারণ, অনুবাদ এবং দু'আর নাম দিয়ে সরাসরি SQLite অনুসন্ধানের সুবিধা।
- 🔖 **বুকমার্ক ও প্রিয় দু'আ**: প্রয়োজনীয় দু'আসমূহে ক্লিক করে পৃথক প্রিয় তালিকায় সংরক্ষণের সুবিধা।
- 📋 **এক-ক্লিক কপি**: সম্পূর্ণ দু'আর আরবি, উচ্চারণ, অর্থ ও রেফারেন্স সহজে অনুলিপি (Copy) করার সুবিধা।
- ⚙️ **ফন্ট সাইজ ও ডিসপ্লে অপশন**: স্বাধীনভাবে আরবি (`Kitab` ফন্ট) ও বাংলা (`Kalpurush` ফন্ট) সাইজ পরিবর্তন এবং প্রদর্শন অপশন কাস্টমাইজেশন।
- 🎨 **ডার্ক ও লাইট মোড**: সুবিধাজনক ডার্ক ও লাইট থিম সাপোর্ট।
- 🦀 **Tauri v2 + Rust ব্যাকএন্ড**: অত্যন্ত হালকা র‍্যাম ব্যবহার (৩০-৪০ MB) এবং সম্পূর্ণ ১০০% অফলাইন ব্যাকএন্ড।

---

## 🛠️ প্রযুক্তি (Tech Stack)

- **ডেক্সটপ ফ্রেমওয়ার্ক**: [Tauri v2](https://tauri.app/) (Rust)
- **ডাটাবেজ**: SQLite3 (`hisnulbd.db`)
- **ফ্রন্টএন্ড ফ্রেমওয়ার্ক**: React 19 + Vite 7
- **স্টাইলিং**: Tailwind CSS v4
- **স্টেট ম্যানেজমেন্ট**: Zustand
- **আইকনস**: 19টি ক্যাটাগরি SVG আইকন এবং React Icons (`react-icons/fa6`)

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
   *বিল্ড সম্পন্ন হলে একক ইনস্টলার `.exe` ফাইলটি `src-tauri/target/release/bundle/nsis/` ফোল্ডারে সংরক্ষিত হবে।*

---

## 👨‍💻 লেখক ও প্রকাশক তথ্য (Author & Publisher)

- **লেখক/প্রকাশক**: **Anum Hosen**
- **ইনস্টিটিউট**: যোশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (JUST), পদার্থবিজ্ঞান বিভাগ
- **ইমেইল**: [anumhosen@gmail.com](mailto:anumhosen@gmail.com)
- **ফেসবুক**: [Anum Hosen Shawon](https://www.facebook.com/anumhosen80/)
- **ফ্রিল্যান্সার**: [@anumhosen](https://www.freelancer.com/u/anumhosen)

---

## 📜 কৃতজ্ঞতা স্বীকার (Acknowledgements)

- দু'আ ও ডাটাবেজ কন্টেন্ট [Greentech Apps Foundation](https://dua.gtaf.org/) এর হিসনুল মুসলিম রিসোর্স থেকে সংগৃহীত।
- ওপেন সোর্স MIT লাইসেন্সের অধীনে প্রকাশিত।
