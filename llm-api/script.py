import pprint
import google.generativeai as genai
from load_creds import load_creds

creds = load_creds()

genai.configure(credentials=creds)

print()
print('Available base models:', [m.name for m in genai.list_tuned_models()])
print('My tuned models:', [m.name for m in genai.list_tuned_models()])

models = [m for m in genai.list_models() if 'generateText' in m.supported_generation_methods]
model = models[0].name
print(model)

prompt = """
You are an expert at solving word problems.

Solve the following problem:

I have three houses, each with three cats.
each cat owns 4 mittens, and a hat. Each mitten was
knit from 7m of yarn, each hat from 4m.
How much yarn was needed to make all the items?

Think about it step by step, and show your work.
"""

completion = genai.generate_text(
    model=model,
    prompt=prompt,
    temperature=0,
    # The maximum length of the response
    max_output_tokens=800,
)

print(type(completion.result))