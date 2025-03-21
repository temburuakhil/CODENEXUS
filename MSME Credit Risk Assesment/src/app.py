from flask import Flask, render_template, request, jsonify
from credit_risk_model import BusinessData, CreditRiskAssessor
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/assess', methods=['POST'])
def assess_risk():
    try:
        data = request.json
        
        # Convert the data to match BusinessData model
        business_data = BusinessData(
            business_vintage=float(data['business_vintage']),
            existing_loan_count=int(data['existing_loan_count']),
            repayment_delays=int(data['repayment_delays']),
            annual_turnover=float(data['annual_turnover']),
            profit_margin=float(data['profit_margin']),
            debt_to_income_ratio=float(data['debt_to_income_ratio']),
            
            gst_filing_delay=int(data['gst_filing_delay']),
            upi_monthly_volume=float(data['upi_monthly_volume']),
            upi_volatility=float(data['upi_volatility']),
            social_media_rating=float(data['social_media_rating']),
            negative_keywords=int(data['negative_keywords']),
            avg_monthly_balance=float(data['avg_monthly_balance']),
            min_monthly_balance=float(data['min_monthly_balance']),
            ecommerce_rating=float(data['ecommerce_rating']),
            return_rate=float(data['return_rate']),
            industry_risk=data['industry_risk'],
            
            business_type=data['business_type'],
            employee_count=int(data['employee_count']),
            location_type=data['location_type']
        )
        
        assessor = CreditRiskAssessor()
        risk_score, risk_tier, probability_of_default = assessor.calculate_risk_score(business_data)
        
        recommendation = ""
        if risk_tier == "Low Risk":
            recommendation = "Eligible for low-interest loans"
        elif risk_tier == "Moderate Risk":
            recommendation = "Higher interest rates may apply, collateral may be needed"
        else:
            recommendation = "High-risk application, may require significant collateral or face rejection"
        
        return jsonify({
            'success': True,
            'risk_score': risk_score,
            'risk_tier': risk_tier,
            'probability_of_default': f"{probability_of_default:.2%}",
            'recommendation': recommendation
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True) 