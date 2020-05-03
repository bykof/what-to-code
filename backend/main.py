from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from interfaces.ideas.router import router as ideas_router
from interfaces.tags.router import router as tags_router

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://server.bykovski.de:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(ideas_router, prefix='/ideas', tags=['Ideas'])
app.include_router(tags_router, prefix='/tags', tags=['Tags'])
