# gemini_api.py

import google.generativeai as genai
from config import GEMINI_API_KEY

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

def generate_response(prompt):
    """Generates text response from Gemini API based on the prompt."""
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    return response.text if response else "No response generated."
