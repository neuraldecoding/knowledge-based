# Tutorial State Space Models (SSM)

Tutorial web interaktif tentang **State Space Models** untuk sequence modeling dengan O(L) complexity.

---

## 🎯 Tentang Tutorial

Tutorial ini menjelaskan **State Space Models** dari dasar hingga arsitektur modern (Mamba), dengan:
- **8 Section Pembelajaran** yang structured
- **6 Animasi Canvas Interaktif** untuk visualisasi
- **Implementasi PyTorch** yang ready-to-use
- **Dark Mode Design** yang modern dan responsive

---

## 📚 Isi Tutorial

### 1. Pengenalan SSM
- Apa itu State Space Models?
- Perbandingan dengan RNN & Transformer
- Learning objectives

### 2. State Space Basics
- Continuous-time state equations
- dx/dt = Ax + Bu, y = Cx + Du
- **Animasi**: State transition visualization

### 3. Discretization
- Zero-order hold (ZOH) method
- Continuous → discrete conversion
- **Animasi**: Discretization process

### 4. Recurrent Mode
- Sequential processing O(L)
- Hidden state propagation
- **Animasi**: Recurrent flow step-by-step

### 5. Convolutional Mode
- SSM as global convolution
- FFT for O(L log L) parallel training
- **Animasi**: Convolution kernel visualization

### 6. Training SSM
- Parameter learning (A, B, C, D)
- HiPPO initialization
- **Animasi**: Training progress simulation

### 7. Mamba Architecture
- Selective state spaces
- Input-dependent Δ, B, C
- **Animasi**: Selective mechanism

### 8. Implementation
- PyTorch S4 code
- Mamba implementation
- Use cases: time series, audio, DNA, text

---

## 🚀 Cara Menjalankan

### Method 1: Python HTTP Server
```bash
cd ssm
python -m http.server 8083
```
Buka browser: `http://localhost:8083`

### Method 2: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 🎨 Fitur

### Animasi Interaktif

1. **State Transition** - Visualize state evolution
2. **Discretization** - Continuous-to-discrete conversion
3. **Recurrent Flow** - Sequential processing
4. **Convolution** - Parallel kernel operation
5. **Training** - Loss and accuracy curves
6. **Selective SSM** - Mamba's adaptive mechanism

### Design

- ✅ **Fixed Layout** - No squeeze bug di full screen
- ✅ **SSM-themed Colors** - Blue/green/purple palette
- ✅ **Responsive** - Mobile, tablet, desktop
- ✅ **Dark Mode** - Easy on the eyes

---

## 📁 Struktur Folder

```
ssm/
├── index.html           # Tutorial utama (8 sections)
├── README.md           # Dokumentasi ini
├── css/
│   ├── main.css        # Base styles (layout, typography)
│   ├── components.css  # Component styles
│   └── animations.css  # Animation keyframes
└── js/
    ├── main.js         # Entry point
    ├── navigation.js   # Navigation logic
    └── animations/     # (Future: individual animation files)
```

---

## 🎓 Konsep Yang Dijelaskan

### Matematika
- State space representation
- Continuous vs discrete time
- Matrix exponentials
- Convolution formulation

### Architecture
- S4 (Structured State Space)
- Mamba (Selective SSM)
- HiPPO initialization
- Hardware-aware design

### Implementation
- PyTorch modules
- Recurrent vs convolutional modes
- Training tips
- Real-world applications

---

## 💡 Technical Highlights

### Why SSMs?
- **Linear complexity**: O(L) inference time
- **Parallelizable**: O(L log L) training with FFT
- **Long-range**: Better than RNNs, competitive with Transformers
- **Efficient**: Lower memory than attention

### Why Mamba?
- **Selective**: Input-dependent parameters
- **Fast**: 5x faster than Transformers on long sequences
- **Quality**: SOTA on various benchmarks
- **Hardware-optimized**: Fused GPU kernels

---

## 📚 References

### Papers
- **S4**: Gu et al. "Efficiently Modeling Long Sequences with Structured State Spaces" (2022)
- **Mamba**: Gu & Dao. "Mamba: Linear-Time Sequence Modeling" (2023)
- **HiPPO**: Gu et al. "HiPPO: Recurrent Memory with Optimal Polynomial Projections" (2020)

### Resources
- Official Mamba repository: [github.com/state-spaces/mamba](https://github.com/state-spaces/mamba)
- S4 repository: [github.com/state-spaces/s4](https://github.com/state-spaces/s4)

---

## 🏗️ Development

Tutorial ini menggunakan:
- HTML5
- CSS3 (custom properties, grid, flexbox)
- JavaScript ES6+ modules
- Canvas API untuk animations

**Note**: Animasi saat ini menggunakan placeholder handlers. Full animations akan diimplementasikan di `js/animations/` folder.

---

## ✅ Status

- ✅ HTML structure (8 sections)
- ✅ CSS styling (responsive, dark mode)
- ✅ Navigation system
- ✅ Content (equations, explanations, code)
- ⏳ Canvas animations (placeholders ready)

---

## 🙏 Credits

Tutorial design mengikuti pattern dari Transformer & TRM tutorials,  dengan SSM-specific content dan visualizations.

**Last Updated**: 2026-01-16
