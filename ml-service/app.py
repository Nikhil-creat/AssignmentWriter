import io, os, torch, torch.nn as nn
from fastapi import FastAPI, UploadFile
from PIL import Image
import torchvision.transforms as T

CLASSES = ['flowchart', 'er', 'sequence', 'other']

class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.f = nn.Sequential(nn.Conv2d(1, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
                               nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
                               nn.AdaptiveAvgPool2d(4), nn.Flatten())
        self.c = nn.Linear(512, len(CLASSES))
    def forward(self, x): return self.c(self.f(x))

model = CNN().eval()
trained = os.path.exists('weights.pt')
if trained: model.load_state_dict(torch.load('weights.pt', map_location='cpu'))
prep = T.Compose([T.Grayscale(), T.Resize((128, 128)), T.ToTensor()])
app = FastAPI()

@app.get('/health')
def health(): return {'ok': True, 'trained': trained}

@app.post('/classify')
async def classify(file: UploadFile):
    data = await file.read()
    if len(data) > 2_000_000: return {'error': 'Max 2 MB'}
    if not trained: return {'label': None, 'note': 'CNN untrained: train on your diagram images and save weights.pt'}
    img = Image.open(io.BytesIO(data)).convert('RGB')
    with torch.no_grad(): p = model(prep(img).unsqueeze(0)).softmax(1)[0]
    i = int(p.argmax())
    return {'label': CLASSES[i], 'confidence': round(float(p[i]), 3)}
