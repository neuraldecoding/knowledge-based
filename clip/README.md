# Tutorial CLIP (Contrastive Language-Image Pre-training)

Tutorial web interaktif tentang **CLIP** untuk multimodal learning dengan animasi.

---

## 🎯 Tentang Tutorial

Tutorial ini menjelaskan **CLIP (Contrastive Language-Image Pre-training)** dari OpenAI, dengan:
- **8 Section Pembelajaran** yang terstruktur
- **Multimodal Visualizations** (Image + Text)
- **PyTorch Implementation** yang ready-to-use
- **Zero-Shot Classification** demos
- **Dark Mode Design** dengan dual-color scheme

---

## 📚 Isi Tutorial

### 1. Pengenalan CLIP
- Apa itu multimodal learning?
- Vision + Language alignment
- Zero-shot capabilities

### 2. Contrastive Learning
- InfoNCE loss formula
- Positive vs negative pairs
- **Animation**: Contrastive pairing visualization

### 3. Dual Encoders
- Image encoder (ViT/ResNet)
- Text encoder (Transformer)
- **Animation**: Encoder architecture

### 4. Training Process
- Batch construction (N×N similarity matrix)
- Symmetric cross-entropy loss
- **Animation**: Training batch + heatmap

### 5. Zero-Shot Classification
- Text prompts as classifiers
- Similarity scoring
- **Animation**: Zero-shot demo

### 6. Applications
- Image-text retrieval
- Text-to-image generation (DALL-E, Stable Diffusion)
- Visual question answering

### 7. Implementation
- PyTorch CH code
- Training loop
- Zero-shot inference

### 8. Advanced Topics
- CLIP variants (OpenCLIP, MetaCLIP)
- Fine-tuning estrategies
- Future directions

---

## 🚀 Cara Menjalankan

### Python HTTP Server
```bash
cd clip
python -m http.server 8084
```
Buka browser: `http://localhost:8084`

---

## 🎨 Fitur

### Animasi Interaktiv
- Contrastive pairing (positive/negative)
- Dual encoder dataflow
- Similarity matrix heatmap
- Zero-shot classification demo

### Design
- ✅ **Multimodal Colors** - Orange (image) + Blue (text)
- ✅ **Fixed Layout** - No squeeze bug
- ✅ **Responsive** - Mobile friendly
- ✅ **Dark Mode** - Modern aesthetic

---

## 📁 Struktur Folder

```
clip/
├── index.html
├── README.md
├── css/
│   ├── main.css
│   ├── components.css
│   └── animations.css
└── js/
    ├── main.js
    └── navigation.js
```

---

## 🎓 Konsep Yang Dijelaskan

### Contrastive Learning
- InfoNCE loss
- Positive & negative sampling
- Temperature scaling

### Architecture
- Vision Transformer (ViT)
- Text Transformer
- Projection heads
- Embedding space alignment

### Zero-Shot
- Text prompts as classifiers
- No training examples needed
- Flexible classification

### Applications
- Image-text retrieval
- Generation (DALL-E, SD)
- Classification
- VQA

---

## 💡 Key Takeaways

- **Multimodal**: Align vision & language
- **Contrastive**: Learn from comparisons
- **Zero-shot**: No labeled data needed
- **Foundation**: Base for many models

---

## 📚 References

- **Paper**: "Learning Transferable Visual Models From Natural Language Supervision" (Radford et al., 2021)
- **Code**: [github.com/openai/CLIP](https://github.com/openai/CLIP)
- **OpenCLIP**: [github.com/mlfoundations/open_clip](https://github.com/mlfoundations/open_clip)

---

**Last Updated**: 2026-01-16
