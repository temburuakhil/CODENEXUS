import time
import schedule
from datetime import datetime
from data_collection.google_news import fetch_indian_financial_news

def update_news():
    """Update the news data"""
    print(f"\nUpdating news at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    num_articles = fetch_indian_financial_news()
    print(f"Fetched {num_articles} articles\n")

# Run immediately on start
update_news()

# Schedule updates every 5 minutes
schedule.every(5).minutes.do(update_news)

print("News updater is running. Press Ctrl+C to stop.")

while True:
    schedule.run_pending()
    time.sleep(1) 