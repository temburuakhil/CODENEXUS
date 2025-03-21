# main.py

from flask import Flask, request, jsonify
from report_generator import generate_report

app = Flask(__name__)

@app.route("/generate", methods=["GET"])
def generate():
    """API endpoint to generate financial reports."""
    report_type = request.args.get("type")
    if not report_type:
        return jsonify({"error": "Please specify a report type."}), 400

    report = generate_report(report_type)
    return jsonify({"report": report})

if __name__ == "__main__":
    app.run(debug=True)
