from dotenv import load_dotenv
import os
import pandas as pd
from flask import Flask, jsonify
from config import Config


from analytics.calculator import (
    calculate_returns, average_return, standard_deviation,
    sharpe_ratio, max_drawdown
)
from analytics.portfolio_data import load_portfolio_data

app = Flask(__name__)


load_dotenv()  # Load variables from .env


@app.get("/")
def home():

    return jsonify({
        "message": f"Welcome to the DevOps Portfolio Analytics API {Config.FLASK_ENV}"
    })


@app.get("/portfolio-values")
def get_portfolio_time_series():
    ts = load_portfolio_data()

    # If index is Timestamp: convert to ISO string
    if isinstance(ts.index[0], pd.Timestamp):
        ts.index = ts.index.strftime("%Y-%m-%d")

    return ts.to_dict()  # string keys, float values — safe for Flask JSON


@app.get("/analytics")
def analytics():
    ts = load_portfolio_data()
    returns = calculate_returns(ts['value'])  # Pass series

    result = {
        "avg_return": round(float(average_return(returns)), 4),
        "stdev": round(float(standard_deviation(returns)), 4),
        "sharpe_ratio": round(float(sharpe_ratio(returns)), 4),
        "max_drawdown": round(float(max_drawdown(ts['value'])), 4)
    }

    return result


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
