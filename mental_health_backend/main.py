from fastapi import FastAPI, Depends, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from .models.models import Journal, User, Base
from datetime import datetime, timedelta
from .settings import OPENAI_API_KEY, SECRET_KEY # if this apikey is on github, you're totally cooked. Please triple check settings has not been committed. Please.
from .db import engine, get_db
from sqlalchemy.orm import Session
from jose import jwt
import logging

app = FastAPI()
client = OpenAI(api_key=OPENAI_API_KEY)
Base.metadata.create_all(bind=engine)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRY = 30

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

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def user_response(status, user, token, token_type="bearer", message="ok"):
    return {
        "status": status,
        "user": user,
        "access_token": token,
        "token_type": token_type,
        "message": message
    }


@app.get("/")
def read_root():
    return {
        "hello": "world",
        "foo": "bar"
    }

@app.post("/journal")
async def handle_entry(request: Request, db: Session = Depends(get_db)):
    req = await request.json()

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", 
             "content": """
                Help me find my Ikigai based on the given answers. 
                Using the concept of Ikigai as a framework with the goal of achieving balance finding my Ikigai, 
                please identify which of the sections i'm strongest in, which of the sections i'm weakest in, 
                and how I can make changes in my life to get closer to my Ikigai.
             """},
            {"role": "user", "content": f"""
                What I love to do: {req["passion"]}, What I'm good at: {req["profession"]}, What I think the world needs: {req["mission"]}, What I can be paid for: {req["vocation"]}
            """}
        ],
        temperature=0.7
    )

    new_entry = Journal(
        passion=req["passion"],
        profession=req["profession"],
        mission=req["mission"],
        vocation=req["vocation"],
        answer=completion.choices[0].message.content,
        user_id=req["user_id"]
    )

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return {
        "id": new_entry.id,
        "published_at": new_entry.published_at,
        "passion": new_entry.passion,
        "profession": new_entry.profession,
        "mission": new_entry.mission,
        "vocation": new_entry.vocation,
        "answer": new_entry.answer
    }

@app.get("/journals")
def get_journals(id: str, db: Session = Depends(get_db)):
    journals = db.query(Journal).filter(Journal.user_id == id).order_by(Journal.published_at.desc())

    return {
        "journals": journals.all()
    }


@app.post("/users/register")
async def register(request: Request, db: Session = Depends(get_db)):
    req = await request.json()

    db_user = db.query(User).filter(User.username == req["username"]).first()
    if db_user:
        return user_response(400, None, None, token_type="", message="Unable to create this user")

    new_user = User(username=req["username"])
    new_user.set_password(req["password"])
    db.add(new_user)
    db.commit()

    access_token_expires = timedelta(ACCESS_TOKEN_EXPIRY)
    access_token = create_access_token(
        data={"sub": new_user.username}, expires_delta=access_token_expires
    )
    return user_response(200, {"username": new_user.username, "id": new_user.id}, access_token)


@app.post("/users/login")
async def login(request: Request, db: Session = Depends(get_db)):
    req = await request.json()

    db_user = db.query(User).filter(User.username == req["username"]).first()

    if not db_user or not db_user.check_password(req["password"]):
        return user_response(400, None, None, token_type="", message="Incorrect username or password")
    
    access_token_expires = timedelta(ACCESS_TOKEN_EXPIRY)
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )

    return user_response(200, {"username": db_user.username, "id": db_user.id}, access_token)


@app.get("/users/token")
def login_via_token(token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        username = payload.get("sub")
    except:
        # import pdb
        # pdb.set_trace()
        return user_response(400, None, None, token_type="", message="Malformed Token")
    user = db.query(User).filter(User.username == username).first()

    return user_response(200, {"username": user.username, "id": user.id}, token)