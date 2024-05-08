import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from hugchat import hugchat
from hugchat.login import Login
import pprint
import google.generativeai as genai
from load_creds import load_creds

load_dotenv()

# EMAIL = os.getenv("EMAIL")
# PASSWORD = os.getenv("PASSWORD")
cookie_path_dir = "./cookies/"

app = FastAPI()

creds = load_creds()

genai.configure(credentials=creds)

# print()
# print('Available base models:', [m.name for m in genai.list_tuned_models()])
# print('My tuned models:', [m.name for m in genai.list_tuned_models()])

# print(model)

# prompt = """
# """


NEXT_APP_URL = os.getenv("NEXT_APP_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[NEXT_APP_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)


# def create_chatbot():
#     if not any([EMAIL, PASSWORD]):
#         raise ValueError("EMAIL and PASSWORD are required")

#     try:
#         if not os.path.exists(cookie_path_dir):
#             sign = Login(EMAIL, PASSWORD)
#             cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)
#         else:
#             sign = Login(EMAIL, None)
#             cookies = sign.loadCookiesFromDir(cookie_path_dir)

#         chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
#         return chatbot
#     except Exception as e:
#         raise ValueError(f"Error logging in: {e}")


@app.get("/chat", response_model=str, status_code=status.HTTP_200_OK)
def chat(prompt: str):
    try:
        # chatbot = create_chatbot()
        models = [m for m in genai.list_models() if 'generateText' in m.supported_generation_methods]
        model = models[0].name

        completion = genai.generate_text(
            model=model,
            prompt=prompt,
            temperature=0,
            # The maximum length of the response
            max_output_tokens=800,
        )
        if not completion.result:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error generating text",
            )
        elif completion.result == None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error generating text",
            )
        
        return completion.result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating chatbot: {e}",
        )
