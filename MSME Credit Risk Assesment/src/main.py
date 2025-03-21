from credit_risk_model import BusinessData, CreditRiskAssessor

def main():
    # Example business data
    sample_data = BusinessData(
        # Core Parameters
        business_vintage=3.0,
        existing_loan_count=2,
        repayment_delays=1,
        annual_turnover=50.0,  # 50 lakhs
        profit_margin=0.15,    # 15%
        debt_to_income_ratio=0.3,
        
        # Alternative Data
        gst_filing_delay=0,
        upi_monthly_volume=2.0,  # 2 lakhs
        upi_volatility=0.25,
        social_media_rating=4.5,
        negative_keywords=2,
        avg_monthly_balance=50.0,  # 50k
        min_monthly_balance=10.0,  # 10k
        ecommerce_rating=4.2,
        return_rate=0.08,
        industry_risk='medium',
        
        # Business Metadata
        business_type='Proprietorship',
        employee_count=5,
        location_type='urban'
    )
    
    # Create risk assessor
    assessor = CreditRiskAssessor()
    
    # Calculate risk metrics
    risk_score, risk_tier, probability_of_default = assessor.calculate_risk_score(sample_data)
    
    # Print results
    print("\n=== MSME Credit Risk Assessment Report ===")
    print(f"\nCredit Risk Score: {risk_score}/100")
    print(f"Risk Tier: {risk_tier}")
    print(f"Probability of Default: {probability_of_default:.2%}")
    
    # Additional context based on risk tier
    if risk_tier == "Low Risk":
        print("\nRecommendation: Eligible for low-interest loans")
    elif risk_tier == "Moderate Risk":
        print("\nRecommendation: Higher interest rates may apply, collateral may be needed")
    else:
        print("\nRecommendation: High-risk application, may require significant collateral or face rejection")

if __name__ == "__main__":
    main() 