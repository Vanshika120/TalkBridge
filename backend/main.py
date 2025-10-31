from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from googletrans import Translator
import json

translator = Translator()
app = FastAPI()

# ✅ CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Login endpoint
# -------------------------------
class LoginRequest(BaseModel):
    email: EmailStr  # ensures a valid email format
    password: str

@app.post("/login")
async def login(req: LoginRequest):
    # For now, we do a mock login
    # In production, check password from database
    if req.password == "":  # simple validation
        raise HTTPException(status_code=400, detail="Password cannot be empty")
    
    print(f"🟢 Login attempt: {req.email}")
    return {"message": f"Login successful for {req.email}"}

# -------------------------------
# WebSocket for translation
# -------------------------------
@app.websocket("/ws/translate")
async def websocket_translate(websocket: WebSocket):
    await websocket.accept()
    print("✅ Client connected")

    try:
        while True:
            data = await websocket.receive_text()
            print("📩 Received raw:", data)

            try:
                payload = json.loads(data)
                text = payload.get("text", "")
                target = payload.get("target", "en")

                print(f"🌍 Translating '{text}' → {target}")
                translated = translator.translate(text, dest=target)

                response = {
                    "translated_text": translated.text,
                    "src": translated.src,
                    "dest": translated.dest
                }

                json_response = json.dumps(response, ensure_ascii=False)
                await websocket.send_text(json_response)
                print("✅ Sent translation:", json_response)

            except Exception as inner_err:
                print("⚠️ Inner error:", inner_err)
                await websocket.send_text(json.dumps({"error": str(inner_err)}))

    except Exception as e:
        print("❌ Outer WebSocket error:", e)
    finally:
        await websocket.close()
        print("🔌 Client disconnected safely.")
