import dash
from dash import dcc, html
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output, State
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from commodity_predictor import CommodityPredictor
import sys
import traceback

# Initialize the Dash app with better error handling
app = dash.Dash(
    __name__, 
    external_stylesheets=[dbc.themes.BOOTSTRAP],
    suppress_callback_exceptions=True
)

try:
    # Load the data
    print("Loading data...")
    df = pd.read_csv('commodity_prices[1].csv')
    print("Data loaded successfully")

    # Initialize the predictor
    print("Initializing predictor...")
    predictor = CommodityPredictor()
    print("Predictor initialized successfully")

except Exception as e:
    print(f"Error during initialization: {str(e)}")
    traceback.print_exc()
    sys.exit(1)

# Define the layout
app.layout = dbc.Container([
    dbc.Row([
        dbc.Col([
            html.H1("Commodity Price Prediction Dashboard",
                   className="text-center mb-4")
        ])
    ]),
    
    dbc.Row([
        dbc.Col([
            dbc.Card([
                dbc.CardHeader("Event Input"),
                dbc.CardBody([
                    html.H5("Natural Disasters"),
                    dcc.Dropdown(
                        id='disaster-dropdown',
                        options=[
                            {'label': 'Drought', 'value': 'drought'},
                            {'label': 'Flood', 'value': 'flood'},
                            {'label': 'Hurricane', 'value': 'hurricane'},
                            {'label': 'Earthquake', 'value': 'earthquake'}
                        ],
                        multi=True
                    ),
                    html.H5("Wars/Conflicts", className="mt-3"),
                    dcc.Dropdown(
                        id='war-dropdown',
                        options=[
                            {'label': 'Regional Conflict', 'value': 'regional'},
                            {'label': 'Global Conflict', 'value': 'global'},
                            {'label': 'Trade War', 'value': 'trade'}
                        ],
                        multi=True
                    ),
                    html.H5("Government Policies", className="mt-3"),
                    dcc.Dropdown(
                        id='policy-dropdown',
                        options=[
                            {'label': 'Trade Restrictions', 'value': 'trade_restrictions'},
                            {'label': 'Subsidies', 'value': 'subsidies'},
                            {'label': 'Environmental Regulations', 'value': 'environmental'}
                        ],
                        multi=True
                    ),
                    dbc.Button("Predict", id="predict-button", color="primary", 
                              className="mt-3")
                ])
            ])
        ], width=4),
        
        dbc.Col([
            dbc.Card([
                dbc.CardHeader("Prediction Results"),
                dbc.CardBody([
                    dcc.Graph(id='prediction-graph')
                ])
            ])
        ], width=8)
    ]),
    
    dbc.Row([
        dbc.Col([
            dbc.Card([
                dbc.CardHeader("Historical Price Trends"),
                dbc.CardBody([
                    dcc.Dropdown(
                        id='commodity-dropdown',
                        options=[{'label': col, 'value': col} 
                                for col in df.columns if col != 'Year'],
                        value=['Gold', 'Crude Oil', 'Wheat'],
                        multi=True
                    ),
                    dcc.Graph(id='historical-graph')
                ])
            ])
        ])
    ], className="mt-4")
])

@app.callback(
    Output('prediction-graph', 'figure'),
    [Input('predict-button', 'n_clicks')],
    [State('disaster-dropdown', 'value'),
     State('war-dropdown', 'value'),
     State('policy-dropdown', 'value')]
)
def update_prediction(n_clicks, disasters, wars, policies):
    try:
        if n_clicks is None:
            return go.Figure()
        
        print(f"Predicting with parameters: disasters={disasters}, wars={wars}, policies={policies}")
        
        # Get predictions from the model
        predictions = predictor.predict(disasters, wars, policies)
        
        # Create the figure
        fig = go.Figure()
        
        # Add bars for price changes
        fig.add_trace(go.Bar(
            x=list(predictions.keys()),
            y=[change['change'] for change in predictions.values()],
            text=[f"{change['change']:.1f}%" for change in predictions.values()],
            textposition='auto',
        ))
        
        fig.update_layout(
            title='Predicted Price Changes',
            xaxis_title='Commodity',
            yaxis_title='Predicted Price Change (%)',
            showlegend=False
        )
        
        return fig
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        traceback.print_exc()
        return go.Figure()

@app.callback(
    Output('historical-graph', 'figure'),
    [Input('commodity-dropdown', 'value')]
)
def update_historical(selected_commodities):
    try:
        if not selected_commodities:
            return go.Figure()
        
        print(f"Plotting historical data for: {selected_commodities}")
        
        fig = go.Figure()
        
        for commodity in selected_commodities:
            fig.add_trace(go.Scatter(
                x=df['Year'],
                y=df[commodity],
                name=commodity,
                mode='lines+markers'
            ))
        
        fig.update_layout(
            title='Historical Price Trends',
            xaxis_title='Year',
            yaxis_title='Price',
            showlegend=True
        )
        
        return fig
    except Exception as e:
        print(f"Error in historical graph: {str(e)}")
        traceback.print_exc()
        return go.Figure()

if __name__ == '__main__':
    try:
        print("Starting server...")
        app.run(debug=True, host='0.0.0.0', port=8050)
    except Exception as e:
        print(f"Error starting server: {str(e)}")
        traceback.print_exc() 