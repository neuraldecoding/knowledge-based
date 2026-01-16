# Tutorial Diffusion Probabilistic Models

Tutorial web interaktif tentang **Diffusion Probabilistic Models (DPM)** untuk generative modeling.

---

## 🎯 Tentang Tutorial

Tutorial ini menjelaskan **Diffusion Models** - generative models yang belajar dengan membalikkan proses penambahan noise. Foundation untuk:
- **Stable Diffusion** - Text-to-image generation
- **DALL-E 2** - CLIP + diffusion decoder
- **Imagen** - Cascaded diffusion for super-resolution
- **Midjourney** - High-quality image generation

---

## 📚 Isi Tutorial

### 1. Pengenalan Diffusion Models
- What is generative modeling?
- Forward vs reverse process
- GAN vs VAE vs Diffusion comparison

### 2. Forward Diffusion Process
- Gradual noise addition (x₀ → x_T)
- Markov chain: q(x_t | x_{t-1})
- Noise schedule β_t (linear, cosine)
- Direct sampling q(x_t | x₀)
- **Animation**: Image → noise

### 3. Reverse Diffusion Process
- Denoising step-by-step (x_T → x₀)
- Learned distribution p_θ(x_{t-1} | x_t)
- U-Net noise predictor
- **Animation**: Noise → image

### 4. DDPM (Denoising Diffusion Probabilistic Models)
- Training objective (variational bound)
- Simplified loss: L = E[||ε - ε_θ||²]
- Reparameterization trick
- Sampling algorithm

### 5. DDIM & Improvements
- Deterministic sampling (10-50 steps vs 1000)
- Faster generation with DDIM
- Variance schedules (linear, cosine, custom)
- Classifier-free guidance for conditioning

### 6. Score-Based Models
- Score matching: ∇_x log p(x)
- Langevin dynamics
- SDE formulation
- Connection to diffusion

### 7. Implementation
- PyTorch DDPM training loop
- Noise addition function
- DDPM sampling code
- DDIM fast sampling
- Complete working example

### 8. Applications
- Stable Diffusion (latent diffusion)
- DALL-E 2 (CLIP + diffusion)
- Image editing & inpainting
- Super-resolution (SR3, Imagen)
- Video & audio generation
- Molecular design

---

## 🚀 Cara Menjalankan

### Python HTTP Server
```bash
cd dpm
python -m http.server 8086
```
Buka browser: `http://localhost:8086`

---

## 🎨 Fitur

### Interactive Elements
- **Forward animation**: Gradual noise addition
- **Reverse animation**: Step-by-step denoising
- **Schedule selector**: Linear, cosine, etc.
- **Timeline**: Diffusion trajectory

### Design
- ✅ **Diffusion Colors** - Red (forward) + Green (reverse)
- ✅ **Fixed Layout** - No squeeze bug
- ✅ **Dual-process boxes** - Forward/reverse visualization
- ✅ **Dark Mode** - Modern aesthetic

---

## 📁 Struktur Folder

```
dpm/
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

### Forward Diffusion
```
q(x_t | x_{t-1}) = N(√(1-β_t)x_{t-1}, β_t I)
q(x_t | x₀) = N(√(ᾱ_t)x₀, (1-ᾱ_t)I)
```

### Reverse Diffusion (Learned)
```
p_θ(x_{t-1} | x_t) = N(μ_θ(x_t, t), Σ_θ(x_t, t))
```

### DDPM Training Loss
```
L = E_{t,x_0,ε}[||ε - ε_θ(√(ᾱ_t)x_0 + √(1-ᾱ_t)ε, t)||²]
```

### Core Principles
- **Forward**: Add Gaussian noise gradually
- **Reverse**: Learn to denoise using U-Net
- **Training**: Predict added noise (MSE loss)
- **Sampling**: Iteratively denoise from x_T to x₀

### Applications
- Stable Diffusion, DALL-E 2, Imagen
- Text-to-image, inpainting, super-resolution
- Video, audio, molecular generation

---

## 💡 Key Takeaways

- **High Quality**: State-of-the-art generation
- **Stable Training**: No GAN mode collapse
- **Diverse Outputs**: Stochastic sampling
- **Flexible**: Text, class, layout conditioning
- **Scalable**: DDIM enables fast sampling

---

## 📚 References

- **DDPM**: "Denoising Diffusion Probabilistic Models" (Ho et al., 2020)
- **DDIM**: "Denoising Diffusion Implicit Models" (Song et al., 2020)
- **Score-Based**: "Score-Based Generative Modeling through SDEs" (Song et al., 2021)
- **Stable Diffusion**: "High-Resolution Image Synthesis with Latent Diffusion Models" (Rombach et al., 2022)
- **DALL-E 2**: "Hierarchical Text-Conditional Image Generation with CLIP Latents" (Ramesh et al., 2022)

---

**Last Updated**: 2026-01-16
