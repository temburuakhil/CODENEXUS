# MSME Credit Risk Assessment Model

This project implements a credit risk assessment model for Micro, Small, and Medium Enterprises (MSMEs). The model uses various business parameters to calculate a credit risk score, risk tier, and probability of default.

## Features

- Comprehensive risk assessment using multiple data points
- Three-tier risk classification system
- Probability of default calculation
- Data validation using Pydantic
- Weighted scoring system considering various business aspects

## Installation

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

The main script provides an example of how to use the credit risk model:

```python
python src/main.py
```

### Input Parameters

The model takes into account various parameters grouped into three categories:

1. Core Parameters:
   - Business Vintage
   - Existing Loan History
   - Annual Turnover
   - Profit Margin
   - Debt-to-Income Ratio

2. Alternative Behavioral Data:
   - GST Compliance
   - UPI Transaction Volume
   - Social Media Sentiment
   - Cash Flow Consistency
   - E-commerce Performance
   - Industry Risk

3. Business Metadata:
   - Business Type
   - Employee Count
   - Location

### Output

The model provides three key outputs:

1. Credit Risk Score (0-100)
2. Risk Tier Classification:
   - Low Risk (70-100)
   - Moderate Risk (40-69)
   - High Risk (0-39)
3. Probability of Default (0-1)

## Customization

You can modify the weights and scoring parameters in the `CreditRiskAssessor` class to adjust the model according to your specific requirements. 