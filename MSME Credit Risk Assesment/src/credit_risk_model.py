from typing import Dict, Any, Tuple
from pydantic import BaseModel, validator
import numpy as np

class BusinessData(BaseModel):
    # Core Parameters
    business_vintage: float  # in years
    existing_loan_count: int
    repayment_delays: int
    annual_turnover: float  # in lakhs
    profit_margin: float  # as decimal
    debt_to_income_ratio: float  # as decimal
    
    # Alternative Data
    gst_filing_delay: int  # in days
    upi_monthly_volume: float  # in lakhs
    upi_volatility: float  # as decimal
    social_media_rating: float  # out of 5
    negative_keywords: int
    avg_monthly_balance: float  # in thousands
    min_monthly_balance: float  # in thousands
    ecommerce_rating: float  # out of 5
    return_rate: float  # as decimal
    industry_risk: str  # 'high', 'medium', 'low'
    
    # Business Metadata
    business_type: str
    employee_count: int
    location_type: str  # 'urban' or 'rural'

    @validator('industry_risk')
    def validate_industry_risk(cls, v):
        if v.lower() not in ['high', 'medium', 'low']:
            raise ValueError('Industry risk must be high, medium, or low')
        return v.lower()

class CreditRiskAssessor:
    def __init__(self):
        # Weights for different components (can be tuned based on historical data)
        self.core_weight = 0.5
        self.alternative_weight = 0.3
        self.metadata_weight = 0.2
        
        # Industry risk mappings
        self.industry_risk_scores = {
            'low': 1.0,
            'medium': 0.6,
            'high': 0.3
        }
        
        # Location type mappings
        self.location_scores = {
            'urban': 1.0,
            'rural': 0.8
        }

    def calculate_core_score(self, data: BusinessData) -> float:
        # Core parameters scoring
        vintage_score = min(1.0, data.business_vintage / 10)  # Cap at 10 years
        loan_history_score = max(0, 1 - (data.repayment_delays * 0.2))
        turnover_score = min(1.0, data.annual_turnover / 500)  # Cap at 5 crore
        profit_score = (data.profit_margin + 0.2) / 0.4  # Normalize around industry average
        dti_score = max(0, 1 - data.debt_to_income_ratio)
        
        return np.mean([vintage_score, loan_history_score, turnover_score, profit_score, dti_score])

    def calculate_alternative_score(self, data: BusinessData) -> float:
        # Alternative data scoring
        gst_score = max(0, 1 - (data.gst_filing_delay / 90))  # Normalize to 90 days
        upi_score = min(1.0, data.upi_monthly_volume / 10)  # Cap at 10 lakhs
        social_score = data.social_media_rating / 5
        cashflow_score = min(1.0, data.avg_monthly_balance / 100)  # Cap at 1L
        ecommerce_score = (data.ecommerce_rating / 5) * (1 - min(0.5, data.return_rate))
        
        return np.mean([gst_score, upi_score, social_score, cashflow_score, ecommerce_score])

    def calculate_metadata_score(self, data: BusinessData) -> float:
        # Business metadata scoring
        industry_score = self.industry_risk_scores[data.industry_risk]
        location_score = self.location_scores[data.location_type]
        size_score = min(1.0, data.employee_count / 50)  # Cap at 50 employees
        
        return np.mean([industry_score, location_score, size_score])

    def calculate_risk_score(self, data: BusinessData) -> Tuple[int, str, float]:
        # Calculate component scores
        core_score = self.calculate_core_score(data)
        alternative_score = self.calculate_alternative_score(data)
        metadata_score = self.calculate_metadata_score(data)
        
        # Calculate weighted final score (0-100)
        final_score = (
            core_score * self.core_weight +
            alternative_score * self.alternative_weight +
            metadata_score * self.metadata_weight
        ) * 100
        
        # Determine risk tier
        if final_score >= 70:
            risk_tier = "Low Risk"
        elif final_score >= 40:
            risk_tier = "Moderate Risk"
        else:
            risk_tier = "High Risk"
        
        # Calculate probability of default (simplified model)
        pd = max(0.01, min(0.99, 1 - (final_score / 100)))
        
        return int(final_score), risk_tier, pd 