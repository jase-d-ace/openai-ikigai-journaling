from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {
        "hello": "world",
        "foo": "bar"
    }

@app.post("/journal")
def send_response():
    return {
        "response": "You're doing great, keep going. Things will get better, I promise"
    }