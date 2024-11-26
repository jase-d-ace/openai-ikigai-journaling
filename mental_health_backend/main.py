from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from .models.journal import Journal
from .settings import OPENAI_API_KEY # if this apikey is on github, you're totally cooked. Please triple check settings has not been committed. Please.

import logging

app = FastAPI()
client = OpenAI(api_key=OPENAI_API_KEY)


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
    emotions_map = {
        -2: "I feel awful",
        -1: "I don't feel great",
        0: "I feel neutral or I'm having trouble feeling at all",
        1: "I actually feel okay",
        2: "I feel incredible"
    }

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You will receive three pieces of information: a Feeling, a Title, and an Entry. Please respond to the entry and feeling as someone who cares about the writer's mental wellbeing, and provide affirmations, advice, and any relevant mental health reminders. There's no need to lead with a greeting, please just get right into the advice."},
            {"role": "user", "content": f"Today: {emotions_map[journal.feeling]}\nTitle: {journal.title}\nEntry: {journal.journal_entry}"}
        ],
        temperature=0.7
    )

    return {
        "response": completion.choices[0].message
    }