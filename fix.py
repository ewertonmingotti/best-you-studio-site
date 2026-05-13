import re

# Fix index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Replace emojis with golden pin
html = re.sub(r'<span class="pilar-icon">.*?</span>\s*<h3>(.*?)</h3>', r'<h3>◆ \1</h3>', html)

# 2. Fix images in index.html for Malota
replacements = {
    r'<img src="trainer-levy.png" alt="Rafael"': r'<img src="trainer-rafael-master.png" alt="Rafael"',
    r'<img src="trainer-maiara.png" alt="Ewerton"': r'<img src="trainer-ewerton.png" alt="Ewerton"',
    r'<img src="trainer-raphael.png" alt="Rafa"': r'<img src="trainer-rafa.png" alt="Rafa"',
    r'<img src="trainer-rafael-master.png" alt="Giovanna"': r'<img src="trainer-giovanna.png" alt="Giovanna"',
    r'<img src="trainer-levy-real.png" alt="Levy"': r'<img src="trainer-levy.png" alt="Levy"',
    r'<img src="trainer-rafa.png" alt="Maiara"': r'<img src="trainer-maiara.png" alt="Maiara"',
    r'<img src="trainer-giovanna.png" alt="Raphael"': r'<img src="trainer-raphael.png" alt="Raphael"',
    r'<img src="trainer-ewerton.png" alt="Lucas"': r'<img src="trainer-lucas-fisio.png" alt="Lucas"'
}

for old, new in replacements.items():
    html = html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Fix script.js
with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

js_replacements = {
    r"img:'trainer-levy.png',      forca:10": r"img:'trainer-rafael-master.png', forca:10",
    r"img:'trainer-maiara.png',    forca:9": r"img:'trainer-ewerton.png',       forca:9",
    r"img:'trainer-raphael.png',   forca:9": r"img:'trainer-rafa.png',          forca:9",
    r"img:'trainer-rafael-master.png', forca:7": r"img:'trainer-giovanna.png',      forca:7",
    r"img:'trainer-levy-real.png', forca:8": r"img:'trainer-levy.png',          forca:8",
    r"img:'trainer-rafa.png',      forca:7": r"img:'trainer-maiara.png',        forca:7",
    r"img:'trainer-giovanna.png',  forca:8": r"img:'trainer-raphael.png',       forca:8",
    r"img:'trainer-ewerton.png',   forca:6": r"img:'trainer-lucas-fisio.png',   forca:6"
}

for old, new in js_replacements.items():
    js = js.replace(old, new)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Fixes applied successfully!")
