# Tutorial InfoNCE (Noise Contrastive Estimation)

Tutorial web interaktif tentang **InfoNCE** loss function untuk contrastive learning.

---

## 🎯 Tentang Tutorial

Tutorial ini menjelaskan **InfoNCE (Info Noise Contrastive Estimation)**, loss function yang digunakan di:
- **CLIP** - Vision-language alignment
- **SimCLR** - Self-supervised vision learning
- **MoCo** - Momentum contrast
- **CPC** - Contrastive predictive coding

---

## 📚 Isi Tutorial

### 1. Pengenalan InfoNCE
- What is contrastive learning?
- Pull positive, push negative
- History (CPC, MoCo, SimCLR, CLIP)

### 2. Mathematical Foundation
- InfoNCE formula derivation
- Softmax interpretation
- Mutual information perspective

### 3. Contrastive Mechanics
- Pull & push forces
- Batch construction
- In-batch negatives
- **Animation**: Contrastive forces

### 4. Temperature Parameter
- τ (tau) parameter role
- High vs low temperature effects
- Learnable temperature
- **Interactive slider**: See temperature impact

### 5. Symmetric Loss
- Bidirectional alignment
- Row-wise vs column-wise softmax
- CLIP's approach
- **Animation**: Symmetric visualization

### 6. Implementation
- PyTorch InfoNCE class
- Symmetric InfoNCE (CLIP-style)
- Training loop
- Learnable temperature

### 7. Applications
- CLIP (vision-language)
- SimCLR (self-supervised)
- MoCo (momentum contrast)
- CPC, wav2vec, VideoMoCo

---

## 🚀 Cara Menjalankan

### Python HTTP Server
```bash
cd infonce
python -m http.server 8085
```
Buka browser: `http://localhost:8085`

---

## 🎨 Fitur

### Interactive Elements
- **Temperature slider**: See distribution change
- **Similarity matrices**: Color-coded
- **Formula derivations**: Step-by-step

### Design
- ✅ **Contrastive Colors** - Green (positive) + Red (negative)
- ✅ **Fixed Layout** - No squeeze bug
- ✅ **Dual-force boxes** - Pull/push visualization
- ✅ **Dark Mode** - Modern aesthetic

---

## 📁 Struktur Folder

```
infonce/
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

### InfoNCE Formula
```
L = -log(exp(sim(q, k⁺)/τ) / Σⱼ exp(sim(q, kⱼ)/τ))
```

### Core Principles
- **Pull positive pairs** closer (maximize similarity)
- **Push negative pairs** apart (minimize similarity)
- **Temperature τ** controls distribution sharpness
- **Symmetric loss** for bidirectional alignment

### Applications
- CLIP, SimCLR, MoCo, CPC
- Vision, audio, video learning
- Multimodal alignment

---

## 💡 Key Takeaways

- **Simple**: Just softmax + cross-entropy
- **Scalable**: Efficient with large batches
- **Effective**: Powers CLIP, SimCLR
- **Flexible**: Unimodal & multimodal
- **Self-supervised**: No labels needed

---

## 📚 References

- **CPC**: "Representation Learning with Contrastive Predictive Coding" (van den Oord et al., 2018)
- **MoCo**: "Momentum Contrast for Unsupervised Visual Representation Learning" (He et al., 2020)
- **SimCLR**: "A Simple Framework for Contrastive Learning of Visual Representations" (Chen et al., 2020)
- **CLIP**: "Learning Transferable Visual Models From Natural Language Supervision" (Radford et al., 2021)

---

**Last Updated**: 2026-01-16
