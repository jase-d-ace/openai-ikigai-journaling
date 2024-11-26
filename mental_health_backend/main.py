from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models.journal import Journal

import logging

app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "hello": "world",
        "foo": "bar"
    }

@app.post("/journal")
def handle_entry(journal: Journal):

    logging.warning("======================")
    logging.warning(journal)
    logging.warning("======================")
    return {
        "response": "You're doing great, keep going. Things will get better, I promise"
    }