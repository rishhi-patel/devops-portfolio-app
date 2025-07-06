import os


class Config:
    FLASK_ENV = os.getenv("FLASK_ENV", "production")
    RISK_FREE_RATE = float(os.getenv("RISK_FREE_RATE", 0.01))
