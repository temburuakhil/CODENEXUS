import pdfplumber
import requests
import nltk
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from textblob import TextBlob
from nltk.sentiment import SentimentIntensityAnalyzer
from config import API_KEY
import re
import google.generativeai as genai

nltk.download('vader_lexicon')

def extract_text_from_pdf(pdf_path):
    """Extract text from the given PDF file"""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text
    
def clean_markdown(text):
    """Remove Markdown formatting like *italics* and **bold**"""
    text = re.sub(r'\*{1,2}(.*?)\*{1,2}', r'\1', text)  # Removes * and ** around words
    return text

def get_summary(text):
    """Gemini API se summary fetch karta hai"""
    genai.configure(api_key=API_KEY)  # API Key ko direct set karo

    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""
        Bhai, mujhe is annual report ka ek **chhota summary** de, lekin ek **desi doston ke liye mazedaar aur sarcastic** tone mein likh. 
        Thoda Hinglish daal, aur aise likh ki lagge koi **funny dost samjha raha ho**. Koi bullet points nahi, bas ek **masta flow wala paragraph** likh jo investor padhte hi maza le.  
        {text}
    """
    
    response = model.generate_content(prompt)
    
    # Debugging
    print("API Response:", response.text)

    # Markdown formatting hatao
    clean_text = clean_markdown(response.text)
    
    return clean_text if clean_text else "Summary not generated."
def analyze_sentiment(text):
    """Perform sentiment analysis"""
    sia = SentimentIntensityAnalyzer()
    sentiment_scores = sia.polarity_scores(text)
    
    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0:
        sentiment = "Positive"
    elif polarity < 0:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"
    
    return sentiment, sentiment_scores

def generate_wordcloud(text):
    """Generate WordCloud image"""
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(text)
    wordcloud_path = "static/wordcloud.png"
    wordcloud.to_file(wordcloud_path)
    return wordcloud_path

def generate_sentiment_chart(sentiment_scores):
    """Generate sentiment analysis chart"""
    labels = ["Positive", "Negative", "Neutral"]
    sizes = [sentiment_scores['pos'], sentiment_scores['neg'], sentiment_scores['neu']]
    
    plt.figure(figsize=(5, 5))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', colors=['green', 'red', 'gray'])
    sentiment_chart_path = "static/sentiment_chart.png"
    plt.title("Sentiment Analysis")
    plt.savefig(sentiment_chart_path)
    return sentiment_chart_path
