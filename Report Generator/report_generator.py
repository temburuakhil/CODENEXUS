import matplotlib.pyplot as plt
import io
import base64
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from datetime import datetime

def create_pdf_report(report_text, graph_data=None, filename=None):
    """Generate a PDF version of the report with optional graph."""
    if filename is None:
        # Generate a default filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"report_{timestamp}.pdf"
    
    # Create PDF document
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72
    )
    
    # Create story (content) for the PDF
    story = []
    
    # Define styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        textColor=colors.HexColor('#1f497d')
    )
    
    content_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=12,
        leading=16,
        spaceAfter=12
    )
    
    # Add title
    title = "Economic Report"
    story.append(Paragraph(title, title_style))
    story.append(Spacer(1, 20))
    
    # Process and add report text
    # Split the text into paragraphs and format them
    paragraphs = report_text.split('\n\n')
    for para in paragraphs:
        if para.strip():
            # Replace bullet points with proper symbols
            para = para.replace('- ', '• ')
            story.append(Paragraph(para, content_style))
            story.append(Spacer(1, 12))
    
    # Add graph if provided
    if graph_data:
        # Convert base64 graph data to image
        img_data = base64.b64decode(graph_data)
        img_path = "temp_graph.png"
        with open(img_path, 'wb') as f:
            f.write(img_data)
        
        # Add graph to PDF
        img = Image(img_path)
        img.drawHeight = 300
        img.drawWidth = 450
        story.append(img)
        
        # Clean up temporary file
        import os
        os.remove(img_path)
    
    # Build PDF
    doc.build(story)
    return filename

def generate_report(report_type, generate_pdf=False):
    """Generate a text-based report or graph based on report type."""
    
    reports = {
        "Quarterly Economic Outlook": """
Quarterly Economy ka Chakkar Babua!

Market ke Latke Jhatke aur Economy ka Dhamaka 🎭

- GDP Growth: Bhai sahab, corporate walon ki to lottery lag gayi! 
  Consumer bhi full mood mein shopping kar raha hai, ekdum mast!
- Inflation: Fed uncle ne socha hai ki interest rates ko thoda upar 
  karna padega, warna mehengai dayan khaye jaat hai! 
        """,
        "Sector-Specific Performance": """
Sector Performance ka Masala Report 🌶️

Tech ka Tadka:
- Bhai AI aur cloud computing ne to market mein aag laga di hai! 
  Revenue growth toh Sharma ji ke bete ke marks ki tarah up up up!

Healthcare ka Hungama:
- Dawai companies be like: "Market down? Humko kya, 
  hum toh pharma company hain, chalte rahenge!" 
        """,
        "Investment Opportunities": """
Paisa Double Karne ke Nuskhe 💰

Growth Sectors jo aapko Crorepati bana sakte hain:
- Renewable Energy: Sarkar ji ne incentives ka prasad baant diya hai
- AI & Data Analytics: Boss, automation ka time aa gaya hai, 
  ab machines bhi kehti hain "Mera number kab aayega?"
        """,
        "Budget Impact Assessment": """
Budget ka Blockbuster Drama 🎬

Sarkari Kharcha Paani:
- Infrastructure aur defense mein paisa hi paisa! 
  Road banao, desh bachao!
- Healthcare aur education ko laga budget cut ka jhatka,
  Sharma ji ke bacche ko private tuition hi jana padega!
        """
    }

    # If it's a report without a graph
    if report_type in reports:
        report_text = reports[report_type]
        graph_data = None
        if generate_pdf:
            pdf_filename = create_pdf_report(report_text)
            return report_text, graph_data, pdf_filename
        return report_text, graph_data

    # Generate Graph for "Investment Reports with Indicators"
    elif report_type == "Investment Reports with Indicators":
        fig, ax = plt.subplots()
        indicators = ["Inflation", "Employment", "Interest Rates"]
        values = [3.2, 4.5, 2.0]  # Example values (modify with real data)
        
        ax.bar(indicators, values, color=["red", "blue", "green"])
        ax.set_title("Key Economic Indicators")
        ax.set_ylabel("Percentage (%)")

        report_text = "Investment Report Based on Economic Indicators"
        graph_data = save_graph(fig)
        if generate_pdf:
            pdf_filename = create_pdf_report(report_text, graph_data)
            return report_text, graph_data, pdf_filename
        return report_text, graph_data

    # Generate Graph for "Custom Comparison Reports"
    elif report_type == "Custom Comparison Reports":
        fig, ax = plt.subplots()
        years = ["2021", "2022", "2023"]
        gdp_growth = [2.1, 3.5, 4.0]  # Example values
        
        ax.plot(years, gdp_growth, marker="o", linestyle="-", color="purple")
        ax.set_title("GDP Growth Over Time")
        ax.set_xlabel("Year")
        ax.set_ylabel("GDP Growth (%)")

        report_text = "Custom Comparison Report: GDP Growth Trends"
        graph_data = save_graph(fig)
        if generate_pdf:
            pdf_filename = create_pdf_report(report_text, graph_data)
            return report_text, graph_data, pdf_filename
        return report_text, graph_data

    error_msg = "Invalid report type selected."
    if generate_pdf:
        pdf_filename = create_pdf_report(error_msg)
        return error_msg, None, pdf_filename
    return error_msg, None

def save_graph(fig):
    """Convert Matplotlib figure to a base64-encoded string."""
    img = io.BytesIO()
    fig.savefig(img, format="png")
    img.seek(0)
    return base64.b64encode(img.getvalue()).decode("utf-8")
