from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
import json

translator = Translator()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws/translate")  # ✅ Match frontend URL
async def websocket_translate(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        payload = json.loads(data)
        text = payload["text"]
        target = payload["target"]  # e.g., "fr", "hi", etc.
        translated_text = translator.translate(text, dest=target).text
        await websocket.send_text(translated_text)
