# llm-api

Copy `.env.example` to `.env` file and update the variables

```bash
cp .env.example .env
```

Install dependencies using pip

```bash
pip install -r requirements.txt
```

Run the FastAPI Server with Uvicorn

```bash
uvicorn main:app --reload
```