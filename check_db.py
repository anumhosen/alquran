import os
import sqlite3

assets_dir = r"d:\Development\TAURI\Al Quran\src-tauri\assets"
for f in sorted(os.listdir(assets_dir)):
    if f.endswith('.db'):
        db_path = os.path.join(assets_dir, f)
        try:
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [row[0] for row in cursor.fetchall()]
            print(f"=== DB: {f} ===")
            for t in tables:
                cursor.execute(f"PRAGMA table_info('{t}');")
                info = cursor.fetchall()
                cols = [f"{col[1]} ({col[2]})" for col in info]
                print(f"  Table: {t} -> {cols}")
                cursor.execute(f"SELECT count(*) FROM '{t}';")
                cnt = cursor.fetchone()[0]
                print(f"         Count: {cnt}")
            conn.close()
        except Exception as e:
            print(f"Error reading {f}: {e}")
