from flask import Flask, render_template, request
from report_generator import generate_report

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    report = None
    graph = None  # Store graph if available
    
    if request.method == "POST":
        report_type = request.form["report_type"]
        report, graph = generate_report(report_type)  # Get both text and graph

    return render_template("index.html", report=report, graph=graph)

if __name__ == "__main__":
    app.run(debug=True)
