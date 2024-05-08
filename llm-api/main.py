import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from hugchat import hugchat
from hugchat.login import Login

load_dotenv()

EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")
cookie_path_dir = "./cookies/"

app = FastAPI()

NEXT_APP_URL = os.getenv("NEXT_APP_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[NEXT_APP_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)


def create_chatbot():
    if not any([EMAIL, PASSWORD]):
        raise ValueError("EMAIL and PASSWORD are required")

    try:
        if not os.path.exists(cookie_path_dir):
            sign = Login(EMAIL, PASSWORD)
            cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)
        else:
            sign = Login(EMAIL, None)
            cookies = sign.loadCookiesFromDir(cookie_path_dir)

        chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
        return chatbot
    except Exception as e:
        raise ValueError(f"Error logging in: {e}")


@app.get("/chat", response_model=str, status_code=status.HTTP_200_OK)
def chat(prompt: str):
    try:
        chatbot = create_chatbot()

        query_result = chatbot.chat(prompt)
        print("query_result", query_result)
        return query_result.text
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating chatbot: {e}",
        )
