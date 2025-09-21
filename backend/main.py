from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
import json  # ✅ Don't forget to import json

translator = Translator()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_text()
            print(f"Received: {data}")
            parsed = json.loads(data)

            user_text = parsed.get("text", "")
            target_lang = parsed.get("target_lang", "hi")  # ✅ fixed key here

            translated_text = translator.translate(user_text, dest=target_lang).text
            await websocket.send_text(translated_text)
        except Exception as e:
            await websocket.send_text(f"Error: {str(e)}")
