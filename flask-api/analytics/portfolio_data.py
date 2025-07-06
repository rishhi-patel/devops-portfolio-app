import pandas as pd


def load_portfolio_data(filepath='data/sample_portfolio.csv'):
    # Load the CSV into a DataFrame
    df = pd.read_csv(filepath, parse_dates=['date'])

    # Compute value per holding (price × shares)
    df['value'] = df['price'] * df['shares']

    # Group by date and sum the portfolio value for that date
    portfolio_ts = df.groupby('date')['value'].sum().reset_index()

    # Optional: make it prettier by setting date as index
    portfolio_ts.set_index('date', inplace=True)

    return portfolio_ts
