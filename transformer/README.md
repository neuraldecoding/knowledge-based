# 🤖 Tutorial Interaktif Transformer

Tutorial web interaktif yang menjelaskan arsitektur Transformer dari dasar hingga advanced, dengan animasi visual dan contoh kasus nyata.

## ✨ Fitur

- **8 Langkah Pembelajaran Terstruktur**
  - Pengenalan & Motivasi
  - Konsep Dasar (Tokens, Embeddings)
  - Mekanisme Attention
  - Self-Attention
  - Multi-Head Attention
  - Positional Encoding
  - Arsitektur Lengkap
  - Contoh Kasus Nyata

- **Animasi Interaktif**
  - Visualisasi perhitungan attention (QKV)
  - Token flow dan attention weights
  - Positional encoding dengan sine/cosine
  - Arsitektur encoder-decoder lengkap

- **Design Modern**
  - Dark mode dengan glassmorphism
  - Gradients dan smooth animations
  - Responsive untuk semua device
  - Progress tracking otomatis

- **Demo Interaktif**
  - Klik kata untuk lihat attention weights
  - Slider positional encoding
  - Visualisasi heatmap attention

## 🚀 Cara Menjalankan

### Opsi 1: Live Server (Recommended)

Menggunakan VS Code Live Server extension:

1. Install extension "Live Server" di VS Code
2. Buka folder `transformer`
3. Klik kanan pada `index.html`
4. Pilih "Open with Live Server"

### Opsi 2: HTTP Server via NPM

```powershell
# Install http-server globally (satu kali saja)
npm install -g http-server

# Jalankan server
cd transformer
http-server -p 8080

# Buka browser ke http://localhost:8080
```

### Opsi 3: Python HTTP Server

```powershell
# Python 3
cd transformer
python -m http.server 8080

# Buka browser ke http://localhost:8080
```

## 📁 Struktur Proyek

```
transformer/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Design system & layout
│   ├── components.css     # Component styles
│   └── animations.css     # Animation keyframes
├── js/
│   ├── main.js            # Entry point
│   ├── navigation.js      # Navigation & progress
│   ├── animations/
│   │   ├── attentionAnimation.js
│   │   ├── tokenFlowAnimation.js
│   │   ├── positionalEncodingAnimation.js
│   │   └── transformerAnimation.js
│   └── interactive/
│       └── attentionDemo.js
└── README.md
```

## 🎨 Teknologi

- **HTML5** - Semantic markup
- **CSS3** - Modern styling dengan CSS Grid, Flexbox, Animations
- **JavaScript ES6+** - Modules, Classes, Canvas API
- **No frameworks** - Pure vanilla JavaScript untuk performa optimal

## 📚 Konten Tutorial

### 1. Pengenalan
Memahami mengapa Transformer penting dan masalah yang dipecahkan

### 2. Konsep Dasar
- Tokenization
- Word embeddings
- Sequence representation

### 3. Attention Mechanism
- Query, Key, Value
- Dot product dan scaling
- Softmax normalization
- Weighted sum

### 4. Self-Attention
- Token memperhatikan token lain
- Dependency jarak jauh
- Parallel processing

### 5. Multi-Head Attention
- Multiple perspectives
- Parallel attention heads
- Concatenation & projection

### 6. Positional Encoding
- Sine/cosine functions
- Position information
- Embedding addition

### 7. Arsitektur Lengkap
- Encoder-Decoder structure
- Feed-forward networks
- Layer normalization
- Residual connections

### 8. Contoh Kasus
- Neural Machine Translation
- BERT (Bidirectional understanding)
- GPT (Text generation)
- Vision Transformer (ViT)

## 🎯 Target Audience

Tutorial ini dirancang untuk:
- 🔰 **Pemula** yang ingin memahami Transformer dari nol
- 🎓 **Mahasiswa** yang belajar Deep Learning
- 💻 **Developer** yang ingin implementasi Transformer
- 🔬 **Researcher** yang perlu referensi cepat

## 💡 Tips Penggunaan

1. **Ikuti urutan** - Tutorial dirancang progressive dari mudah ke sulit
2. **Klik animasi** - Semua visualisasi bisa di-play/reset
3. **Interaktif** - Klik kata-kata untuk eksplorasi
4. **Progress tersimpan** - Progress otomatis disimpan di browser
5. **Mobile-friendly** - Bisa diakses di smartphone/tablet

## 🔧 Customization

Tutorial ini mudah dikustomisasi:

### Ubah Warna
Edit variabel CSS di `css/main.css`:
```css
:root {
    --accent-primary: #00d4ff;
    --accent-secondary: #8b5cf6;
    /* ... */
}
```

### Tambah Contoh Kalimat
Edit di `js/animations/tokenFlowAnimation.js`:
```javascript
const sentence = ['Tambah', 'kata', 'di', 'sini'];
```

### Ubah Animasi Speed
Edit di file animation masing-masing:
```javascript
progress += 0.01; // Ubah nilai untuk speed berbeda
```

## 📖 Referensi

- Paper asli: [Attention is All You Need](https://arxiv.org/abs/1706.03762)
- The Illustrated Transformer (Jay Alammar)
- Transformer Architecture (Hugging Face)

## 🤝 Kontribusi

Tutorial ini open untuk improvement! Ide kontribusi:
- Tambah contoh kasus lain (T5, BART, etc)
- Implementasi code examples
- Terjemahan bahasa lain
- Improve animasi

## 📝 License

Free to use untuk pembelajaran dan edukasi.

## 🙏 Acknowledgments

Dibuat dengan ❤️ untuk komunitas AI Indonesia

---

**Selamat Belajar! 🚀**

Jika ada pertanyaan atau feedback, feel free to reach out!
