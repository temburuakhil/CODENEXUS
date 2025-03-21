# Commodity Price Prediction Dashboard

This project provides a web-based dashboard for predicting commodity price changes based on global events such as natural disasters, wars/conflicts, and government policies. The dashboard includes historical price trends visualization and predictive analytics.

## Features

- Interactive web dashboard built with Dash and Plotly
- Prediction of commodity price changes based on:
  - Natural disasters (drought, flood, hurricane, earthquake)
  - Wars and conflicts (regional, global, trade wars)
  - Government policies (trade restrictions, subsidies, environmental regulations)
- Historical price trend visualization
- Multi-commodity comparison
- Real-time updates and interactive graphs

## Installation

1. Clone this repository
2. Install the required packages:
```bash
pip install -r requirements.txt
```

## Usage

1. Run the application:
```bash
python app.py
```

2. Open your web browser and navigate to `http://localhost:8050`

3. Use the dashboard:
   - Select events from the dropdowns on the left panel
   - Click "Predict" to see the predicted price changes
   - Use the bottom panel to compare historical price trends

## Data

The project uses historical commodity price data from 1960 to 2021, including various commodities such as:
- Agricultural products (Wheat, Rice, Maize, etc.)
- Precious metals (Gold, Silver, Platinum)
- Energy resources (Oil, Natural Gas, Coal)
- Industrial materials (Cotton, Rubber, etc.)

## Model

The prediction model combines:
- Historical price trends analysis
- Event impact factors based on historical data
- Market correlation analysis

## Note

The predictions are based on historical patterns and predefined impact factors. Real-world commodity prices are influenced by many complex factors, and this tool should be used as one of many resources for making informed decisions. 