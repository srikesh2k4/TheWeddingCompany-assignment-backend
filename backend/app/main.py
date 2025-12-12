from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import org_routes, admin_routes
import uvicorn
import os
from dotenv import load_dotenv

# Load env variables
load_dotenv()

app = FastAPI(title="Org Management Student-style")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(admin_routes.router)
app.include_router(org_routes.router)

@app.get('/')
def root():
    return {'msg': 'Org API running'}

if __name__ == '__main__':
    port = int(os.getenv("PORT", 8000))  # fallback to 8000 if missing
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
