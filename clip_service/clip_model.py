# clip_model.py
import clip
import torch

# Loading the model and preprocessing once
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Exposing these for global use
__all__ = ["model", "preprocess", "device"]