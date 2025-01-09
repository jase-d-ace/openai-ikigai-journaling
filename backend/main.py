from fastapi import FastAPI, Depends, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from .models.models import Journal, User, Base
from datetime import datetime, timedelta
from .settings import OPENAI_API_KEY, SECRET_KEY # if this apikey is on github, you're totally cooked. Please triple check settings has not been committed. Please.
from .db import engine, get_db
from sqlalchemy.orm import Session
from jose import jwt
from .schemas.user_update import UserUpdate
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

    messages = [
            {"role": "system", 
             "content": """
                Help me find my Ikigai based on the given answers. 
                Using the concept of Ikigai as a framework, and with the goal of achieving balance and finding my Ikigai, 
                please identify which of the sections i'm strongest in, which of the sections i'm weakest in, 
                and the specific steps I can take to improve the sections that i'm weakest in. Additionally, please provide any other advice 
                that is realistic and feasible for the average human being. What steps can I take towards living a more fulfilling life in the framework of Ikigai?
                Please refer me to any books, YouTube channels, podcasts, or other forms of media that I can consume to help me more understand my specific Ikigai.
                When you respond, please keep it inspiring and conversational. When giving suggestions, please break them down into small, actionable next steps that I can take over time.
             """},
             {"role": "user", "content": f"""
                What I love to do: {req["passion"]}, What I'm good at: {req["profession"]}, What I think the world needs: {req["mission"]}, What I can be paid for: {req["vocation"]}, Other thoughts: {req["content"]}
            """}
        ]
    
    prev_entry = db.query(Journal).filter(Journal.user_id == req["user_id"]).order_by(Journal.published_at.desc()).first()
    
    if prev_entry:
        messages[1]["content"] += f"""
                please also compare my answers above to my previous journal entry, and identify any places i've grown, any places i've regressed, and any other pieces of advice that come up from comparing the two:
                What I love: {prev_entry.passion}, What I'm good at: {prev_entry.profession}, What I think the world needs: {prev_entry.mission}, What I can be paid for: {prev_entry.vocation}, other thoughts: {prev_entry.other}.
                Your previous thoughts are {prev_entry.answer}. If you've changed your mind since this answer, let me know, and also let me knkow why.
            """
        
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.7
    )

    new_entry = Journal(
        passion=req["passion"],
        profession=req["profession"],
        mission=req["mission"],
        vocation=req["vocation"],
        other=req["content"],
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
        return user_response(400, None, None, 0, token_type="", message="Unable to create this user")

    new_user = User(username=req["username"])
    new_user.set_password(req["password"])
    db.add(new_user)
    db.commit()

    access_token_expires = timedelta(ACCESS_TOKEN_EXPIRY)
    access_token = create_access_token(
        data={"sub": new_user.username}, expires_delta=access_token_expires
    )
    return user_response(200, {"username": new_user.username, "id": new_user.id, "journal_count": 0}, access_token)


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

    return user_response(200, {"username": db_user.username, "id": db_user.id, "first_name": db_user.first_name, "last_name": db_user.last_name, "description": db_user.description, "journal_count": len(db_user.journals)}, access_token)


@app.get("/users/token")
def login_via_token(token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        username = payload.get("sub")
    except:
        return user_response(400, None, None, token_type="", message="Malformed Token")
    user = db.query(User).filter(User.username == username).first()

    return user_response(200, {"username": user.username, "id": user.id, "first_name": user.first_name, "last_name": user.last_name, "description": user.description, "journal_count": len(user.journals)}, token)

@app.put("/users/update")
async def update_user(id: str, token: str, user_update: UserUpdate, request: Request, db: Session = Depends(get_db)):
    req = await request.json()

    db_user = db.query(User).filter(User.id == id).first()

    user_data = user_update.model_dump(exclude_unset=True)
    for k, v in user_data.items():
        setattr(db_user, k, v)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return user_response(200, {"username": db_user.username, "id": db_user.id, "first_name": db_user.first_name, "last_name": db_user.last_name, "description": db_user.description, "journal_count": len(db_user.journals)}, token)

@app.get("/users/generate-gpt")
async def generate_gpt_analysis(id: str, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == id).first()
    journals = db_user.journals

    content = ""

    for journal in journals:
        content += f"""
            My mission: {journal.mission}, My passion: {journal.passion}, My profession: {journal.profession}, My vocation: {journal.vocation}, any other thoughts: {journal.other}
        """

    messages = [
        {"role": "system", 
            "content": """
            The next message will be my previous journal entries in my journey to find my ikigai. 
            Given all of them, summarize them for me, tell me what you think they say about me, and give me some options for what I should look into given everything i included in my journals.
            Please give me realistic suggestions for someone with limited time and funds that can lead to the most impact or improvement in a short time.
            Additionally, please give me concrete examples for each suggestion/option to explore, and at the end, please recommend some content related to my interests that might help me educate myself further about that topic and how it might relate to ikigai
            """
        },
            {"role": "user", "content": content}
    ]

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.7
    )

    return {"status": 200, "analysis": completion.choices[0].message.content}