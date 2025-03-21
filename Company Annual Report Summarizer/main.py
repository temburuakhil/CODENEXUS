import google.generativeai as genai
import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Select Gemini model

model = genai.GenerativeModel('gemini-1.5-flash-latest')

# News API Key (Replace with your API Key)
NEWS_API_KEY = os.getenv("NEWS_API_KEY")  # Ensure you have this key in your .env file
NEWS_API_URL = "https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=" + NEWS_API_KEY


def fetch_tech_news():
    """
    Fetches the latest tech news from the NewsAPI.
    
    Returns:
        A list of articles with their titles and descriptions.
    """
    try:
        response = requests.get(NEWS_API_URL)
        if response.status_code == 200:
            data = response.json()
            return data.get("articles", [])  # Returns a list of articles
        else:
            print(f"Error fetching news: {response.status_code}")
            return []
    except Exception as e:
        print(f"An error occurred while fetching news: {e}")
        return []


def analyze_sentiment(text):
    """
    Analyzes the sentiment of the given text using Gemini.

    Args:
        text (str): The news article text to analyze.

    Returns:
        A dictionary containing the sentiment label and confidence score.
    """
    prompt = f"""
    Analyze the sentiment of the following news headline and description:
    "{text}"

    Provide the sentiment as one of the following: "Positive", "Negative", or "Neutral".
    Also provide a confidence score between 0.0 and 1.0 (higher is more confident).
    Return the result in JSON format like this:
    {{
      "sentiment": "SentimentLabel",
      "confidence": ConfidenceScore
    }}
    """

    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip().replace('```json', '').replace('```', '')

        # Parse JSON response
        try:
            result = json.loads(response_text)
            if "sentiment" in result and "confidence" in result:
                return result
        except json.JSONDecodeError:
            print(f"Error decoding JSON: {response_text}")

    except Exception as e:
        print(f"An error occurred: {e}")

    return None


if __name__ == "__main__":
    articles = fetch_tech_news()

    if articles:
        for article in articles[:5]:  # Limit to first 5 articles
            title = article.get("title", "No Title")
            description = article.get("description", "No Description")
            content = f"{title}. {description}"

            sentiment_result = analyze_sentiment(content)

            if sentiment_result:
                print(f"Title: {title}")
                print(f"Sentiment: {sentiment_result['sentiment']}")
                print(f"Confidence: {sentiment_result['confidence']}")
                print("-" * 50)
            else:
                print(f"Failed to analyze sentiment for: {title}")
                print("-" * 50)
    else:
        print("No tech news found.")
