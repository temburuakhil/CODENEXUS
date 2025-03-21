import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor

class CommodityPredictor:
    def __init__(self):
        # Load historical data
        self.df = pd.read_csv('commodity_prices[1].csv')
        self.commodities = [col for col in self.df.columns if col != 'Year']
        
        # Define impact factors for different events
        self.impact_factors = {
            'natural_disasters': {
                'drought': {
                    'Wheat': 15, 'Maize': 12, 'Rice': 10, 'Soybean': 8,
                    'Sugar': 5, 'Cotton': 3
                },
                'flood': {
                    'Rice': -8, 'Wheat': -5, 'Maize': -5, 'Cotton': -4,
                    'Soybean': -3
                },
                'hurricane': {
                    'Crude Oil': 10, 'Natural Gas': 8, 'Cotton': -5, 'Sugar': -4
                },
                'earthquake': {
                    'Crude Oil': 5, 'Natural Gas': 4, 'Gold': 3, 'Silver': 3
                }
            },
            'wars': {
                'regional': {
                    'Crude Oil': 12, 'Gold': 8, 'Silver': 6, 'Wheat': 5,
                    'Natural Gas': 5
                },
                'global': {
                    'Gold': 15, 'Silver': 12, 'Crude Oil': 20, 'Wheat': 10,
                    'Natural Gas': 15
                },
                'trade': {
                    'Soybean': -8, 'Wheat': -5, 'Cotton': -6
                }
            },
            'policies': {
                'trade_restrictions': {
                    'Wheat': 8, 'Soybean': 7, 'Cotton': 6
                },
                'subsidies': {
                    'Wheat': -4, 'Maize': -4, 'Cotton': -3, 'Sugar': -3
                },
                'environmental': {
                    'Crude Oil': 5, 'Coal': 7, 'Natural Gas': 4
                }
            }
        }
        
        # Initialize the model
        self.initialize_model()
    
    def initialize_model(self):
        """Initialize and train the prediction model using historical data"""
        # Calculate year-over-year changes
        self.price_changes = {}
        for commodity in self.commodities:
            # Use ffill() instead of fillna(method='ffill')
            filled_data = self.df[commodity].ffill()
            changes = filled_data.pct_change(fill_method=None) * 100
            self.price_changes[commodity] = changes.mean()
    
    def predict(self, disasters=None, wars=None, policies=None):
        """Predict price changes based on input events"""
        predictions = {}
        
        # Initialize with base changes
        for commodity in self.commodities:
            predictions[commodity] = {'change': 0}
        
        # Add impact of natural disasters
        if disasters:
            for disaster in disasters:
                if disaster in self.impact_factors['natural_disasters']:
                    impacts = self.impact_factors['natural_disasters'][disaster]
                    for commodity, impact in impacts.items():
                        if commodity in predictions:
                            predictions[commodity]['change'] += impact
        
        # Add impact of wars
        if wars:
            for war in wars:
                if war in self.impact_factors['wars']:
                    impacts = self.impact_factors['wars'][war]
                    for commodity, impact in impacts.items():
                        if commodity in predictions:
                            predictions[commodity]['change'] += impact
        
        # Add impact of policies
        if policies:
            for policy in policies:
                if policy in self.impact_factors['policies']:
                    impacts = self.impact_factors['policies'][policy]
                    for commodity, impact in impacts.items():
                        if commodity in predictions:
                            predictions[commodity]['change'] += impact
        
        # Add historical trend component
        for commodity in self.commodities:
            predictions[commodity]['change'] += self.price_changes.get(commodity, 0) * 0.2
        
        # Filter out commodities with no significant change
        predictions = {k: v for k, v in predictions.items() 
                      if abs(v['change']) > 0.5}
        
        # Sort by absolute change
        predictions = dict(sorted(predictions.items(), 
                                key=lambda x: abs(x[1]['change']), 
                                reverse=True))
        
        return predictions

    def get_historical_correlation(self, commodity1, commodity2):
        """Calculate historical correlation between two commodities"""
        if commodity1 in self.df.columns and commodity2 in self.df.columns:
            return self.df[commodity1].corr(self.df[commodity2])
        return 0 