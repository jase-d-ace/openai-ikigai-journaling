# Finding Your Ikigai

## What is your Ikigai? 
Ikigai (pronounced "ee-kee-guy") is a Japanese concept that translates to "reason for being." It represents the intersection of the things that make life fulfilling and meaningful: a unique blend of purpose, passion, and practicality.

Rooted in Japanese culture, ikigai is about discovering the balance between what you love, what you’re good at, what the world needs, and what you can be paid for. At its core, ikigai is a deeply personal journey that encourages individuals to reflect on their passions, strengths, and contributions to the world. It's not just about achieving happiness or success but about finding a sense of fulfillment that motivates you to wake up each morning with purpose.

The word itself comes from "iki" (life) and "gai" (value or worth), making it a way to explore the things that bring value to your life and give you a reason to live. While the idea of ikigai is deeply ingrained in Japanese culture, its principles resonate universally and can serve as a powerful framework for anyone seeking clarity in their life or career.

## What is this app?
user can provide ChatGPT with their 4 pillars of Ikigai and receive some more questions and guidance on finding it for themselves.

## How it works
This app is built on a React/FastAPI/Postgres stack that leverages the OpenAI API to ask ChatGPT for guiding questions in response to a user's 4 pillars. The user will create an account, and then upon creating an account, fill out a form by reflecting on what each pillar of Ikigai means to them and how it applies to their own lives, and then will receive an answer from ChatGPT on how to get closer to their Ikigai.

The user's entries are saved in the database and can be retrieved and reviewed. And the last entry also becomes part of the next time the user fills out the form. The idea is that the user can fill out the form as many times as they like whenever they feel like something about their 4 pillars has changed, and GPT-4o-mini will be able to compare the last journal entry to the one that was just submitted, and it can serve as a sort of journey for the user to see how far they've come.

## Installing
### For the backend
* Ensure you already have a OpenAI APIKey. Create a `settings.py` file in the `mental_health_backend` directory and paste your apikey there with the variable name `OPENAI_API_KEY`, and also create a `SECRET_KEY` with whatever string you want to use for your security algorithm.

* The `alembic.ini` file is also looking for a database string, so create a database and then replace the `sqlalchemy.url` string that's in the file with yours.

1. `pip install -r requirements.txt`
2. `alembic upgrade head` (I'm not actually sure if this is necessary to set up your database, but i'm assuming so? I have no idea if alembic runs the migrations in order to set up your databse.)
3. `fastapi dev main.py`

### For the frontend
1. `npm install`
2. `npm run dev`


## Still Todo
* Testing
* Making it look a little more lively and less barren and empty
* Exploring other things to do with the information collected.
