from gnews import GNews
import json
from datetime import datetime, timedelta
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(levelname)s - %(message)s')

def get_finbert_sentiment(text):
    """
    Get sentiment using FinBERT model
    Returns: 'positive', 'negative', or 'neutral'
    """
    try:
        logging.info("Loading FinBERT model and tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
        model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")
        
        logging.info("Performing sentiment analysis...")
        inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
        
        sentiment_labels = ['positive', 'negative', 'neutral']
        sentiment = sentiment_labels[predictions[0].argmax()]
        confidence = predictions[0].max().item()
        
        logging.info(f"Sentiment analysis complete: {sentiment} with confidence {confidence:.2f}")
        return {
            'label': sentiment,
            'score': confidence,
            'text_analyzed': text[:512]  # Store analyzed text for reference
        }
    except Exception as e:
        logging.error(f"Error in sentiment analysis: {str(e)}")
        return {'label': 'neutral', 'score': 0.0, 'text_analyzed': ''}

def is_policy_related(title, description):
    """
    Check if the news is related to financial policies, budget, taxes etc.
    """
    policy_keywords = [
        'budget', 'fiscal', 'policy', 'rbi', 'reserve bank', 'regulation',
        'tax', 'gst', 'government', 'ministry of finance', 'nirmala sitharaman',
        'finance minister', 'monetary policy', 'interest rate', 'repo rate',
        'inflation', 'deficit', 'subsidy', 'disinvestment', 'fdi', 'foreign investment',
        'sebi', 'securities', 'banking regulation', 'financial regulation',
        'economic policy', 'trade policy', 'import duty', 'export policy'
    ]
    
    text = (title + ' ' + description).lower()
    is_related = any(keyword in text for keyword in policy_keywords)
    if is_related:
        logging.info(f"Policy-related article found: {title}")
    return is_related

def fetch_indian_financial_news():
    """
    Fetch Indian financial news from Google News with policy focus and FinBERT sentiment
    """
    try:
        logging.info("Starting news collection...")
        # Initialize GNews
        google_news = GNews(language='en', country='IN', period='7d', max_results=30)
        
        # Define search queries for different sources with policy focus
        sources = {
            'moneycontrol': 'site:moneycontrol.com (budget OR policy OR tax OR RBI OR government OR regulation)',
            'economictimes': 'site:economictimes.indiatimes.com (budget OR policy OR tax OR RBI OR government OR regulation)',
            'businessstandard': 'site:business-standard.com (budget OR policy OR tax OR RBI OR government OR regulation)',
            'livemint': 'site:livemint.com (budget OR policy OR tax OR RBI OR government OR regulation)'
        }
        
        all_news = []
        
        for source_name, query in sources.items():
            try:
                logging.info(f"Fetching news from {source_name}...")
                # Search news for each source
                news_items = google_news.get_news(query)
                logging.info(f"Found {len(news_items)} articles from {source_name}")
                
                # Process each news item
                for item in news_items:
                    try:
                        # Check if news is policy related
                        if is_policy_related(item['title'], item.get('description', '')):
                            # Combine title and description for sentiment analysis
                            text_for_sentiment = f"{item['title']} {item.get('description', '')}"
                            sentiment_result = get_finbert_sentiment(text_for_sentiment)
                            
                            news_data = {
                                'title': item['title'],
                                'description': item.get('description', 'No description available'),
                                'url': item['url'],
                                'publishedAt': item['published date'],
                                'source': {'name': item['publisher']['title']},
                                'sourceName': source_name,
                                'sentiment': sentiment_result,
                                'categories': ['policy', 'finance']
                            }
                            all_news.append(news_data)
                            logging.info(f"Processed article: {item['title'][:50]}... with sentiment {sentiment_result['label']}")
                    except Exception as e:
                        logging.error(f"Error processing individual article: {str(e)}")
                        continue
            except Exception as e:
                logging.error(f"Error fetching news from {source_name}: {str(e)}")
                continue
        
        # Sort news by date
        all_news.sort(key=lambda x: x['publishedAt'], reverse=True)
        
        # Save to JSON file
        logging.info(f"Saving {len(all_news)} articles to latest_news.json")
        with open('latest_news.json', 'w', encoding='utf-8') as f:
            json.dump(all_news, f, ensure_ascii=False, indent=2, default=str)
        
        logging.info(f"Successfully saved {len(all_news)} policy-related news articles with sentiment analysis")
        return all_news
        
    except Exception as e:
        logging.error(f"Error in fetch_indian_financial_news: {str(e)}")
        return []

if __name__ == "__main__":
    news = fetch_indian_financial_news()
    logging.info(f"Script completed. Fetched {len(news)} news articles") 