# 🌳 Tutorial Tiny Recursive Model

Tutorial web interaktif tentang **Tiny Recursive Model** - neural networks yang memproses struktur tree secara recursive.

## ✨ Fitur

- **7 Langkah Pembelajaran**
  - Pengenalan Recursive Models
  - Konsep Dasar Rekursi & Trees
  - Recursive Neural Networks
  - Arsitektur Tiny Recursive Model
  - Forward Pass Animation
  - Training Process (Backprop Through Structure)
  - Implementasi PyTorch & Use Cases

- **Animasi Interaktif**
  - Tree structure visualization
  - Recursive forward pass (leaf → root)
  - Post-order traversal animation
  - Architecture diagram

- **Design Modern**
  - Konsisten dengan Transformer tutorial
  - Dark mode dengan tree-themed colors
  - Responsive untuk semua device
  - Progress tracking

## 🚀 Cara Menjalankan

### Python HTTP Server
```powershell
cd trm
python -m http.server 8081
# Buka http://localhost:8081
```

### VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📁 Struktur Proyek

```
trm/
├── index.html
├── css/
│   ├── main.css
│   ├── components.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   └── animations/
│       ├── treeAnimation.js
│       └── recursiveFlowAnimation.js
└── README.md
```

## 📚 Konten

### Recursive Model Basics
- Tree structures
- Post-order traversal
- Bottom-up computation

### Model Architecture
- Word embeddings untuk leaves
- Composition function: h = tanh(W[h_left; h_right] + b)
- Parameter sharing across nodes
- Classification di root

### Training
- Backpropagation Through Structure (BPTS)
- Gradient flow: root → leaves
- Parameter updates

## 🎯 Use Cases

- Sentiment analysis dengan parse trees
- Semantic composition
- Question answering
- Image segmentation (hierarchical)

## 💻 Teknologi

- HTML5, CSS3, JavaScript ES6+
- Canvas API untuk visualisasi
- Pure vanilla JS (no frameworks)

---

**Selamat Belajar! 🌳**
