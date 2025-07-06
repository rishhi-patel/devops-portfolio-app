from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)


@app.get("/analytics")
def analytics():
    dummy = pd.DataFrame({"return": [0.05, 0.02, 0.07]})
    return jsonify({
        "avgReturn": dummy["return"].mean(),
        "maxReturn": dummy["return"].max()
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
