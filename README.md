# 🖼️ PicGen - AI Image Generator (Frontend-Only)

**PicGen** is a simple, clean AI image generator web app built with just **HTML, CSS, and JavaScript**. It lets users generate beautiful images from text prompts using the Hugging Face Inference API.

---

## 🌟 Features

- 🎨 Generate images from text prompts  
- 🔁 Choose from multiple Hugging Face models  
- 📐 Select different aspect ratios  
- 🔢 Generate multiple images at once  
- 📥 Download any image with one click  
- ✨ One-click example prompt filler

---

## 💻 Technologies Used

- HTML
- CSS
- JavaScript (vanilla)
- Hugging Face Inference API

---

## 🧪 How to Use

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Enter a prompt and hit generate.
4. Download your AI-generated art!

---

## 📂 File Structure

PicGen/
├── index.html # Single-page app
├── style.css # Styling for layout, buttons, grid
└── script.js # Main JavaScript logic

yaml
Copy
Edit

---

## 🔑 Hugging Face API Key

> ⚠️ You need a Hugging Face token with inference access.  
> ⚠️ Don't expose your token in production. This example is frontend-only and should be used for testing or personal projects.

Replace this in `script.js`:

```javascript
const API_KEY = 'hf_your_actual_token_here';
🧠 Example Prompts
"A steampunk spaceship flying through clouds at sunset"

"A mystical library with glowing floating books"

"A dragon sleeping on a pile of gold in a crystal cave"

"A futuristic city with flying cars and neon lights"

Click the 🎲 button to randomly fill one!

📥 Downloading
Hover over a generated image and click the Download icon to save it locally.
