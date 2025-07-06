import numpy as np


def calculate_returns(portfolio_ts):
    # Calculate percent change (monthly returns)
    return portfolio_ts.pct_change().dropna()


def average_return(returns):
    return returns.mean()


def standard_deviation(returns):
    return returns.std()


def sharpe_ratio(returns, risk_free_rate=0.01):
    # Monthly risk-free adjustment
    excess_returns = returns - (risk_free_rate / 12)
    return excess_returns.mean() / excess_returns.std()


def max_drawdown(portfolio_ts):
    cumulative = portfolio_ts.cummax()
    drawdowns = (portfolio_ts - cumulative) / cumulative
    return drawdowns.min()
