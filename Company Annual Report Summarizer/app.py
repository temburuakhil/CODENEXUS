from flask import Flask, render_template, request
import os
from utils import extract_text_from_pdf, get_summary, analyze_sentiment, generate_wordcloud, generate_sentiment_chart
from config import API_KEY

app = Flask(__name__)

# Ensure temp directory exists
os.makedirs("temp", exist_ok=True)

@app.route("/", methods=["GET", "POST"])
def index():
    summary = ""
    sentiment = ""
    wordcloud_path = ""
    sentiment_chart_path = ""

    if request.method == "POST":
        uploaded_file = request.files.get("report")
        if uploaded_file:
            pdf_path = os.path.join("temp", uploaded_file.filename)
            uploaded_file.save(pdf_path)  # Save uploaded file

            # Extract text from the PDF
            text = extract_text_from_pdf(pdf_path)

            # Get summary from Gemini
            summary = get_summary(text)

            # Perform sentiment analysis
            sentiment, sentiment_scores = analyze_sentiment(text)

            # Generate Word Cloud
            wordcloud_path = generate_wordcloud(text)

            # Generate Sentiment Chart
            sentiment_chart_path = generate_sentiment_chart(sentiment_scores)

    return render_template("index.html", summary=summary, sentiment=sentiment, wordcloud_path=wordcloud_path, sentiment_chart_path=sentiment_chart_path)

if __name__ == "__main__":
    app.run(debug=True)
