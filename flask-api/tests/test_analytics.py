from app import app


def test_analytics(client):
    res = client.get("/analytics")
    assert res.status_code == 200
    data = res.get_json()

    assert "avg_return" in data
    assert "stdev" in data
    assert "sharpe_ratio" in data
    assert "max_drawdown" in data

    assert isinstance(data["avg_return"], float)
    assert isinstance(data["stdev"], float)
    assert isinstance(data["sharpe_ratio"], float)
    assert isinstance(data["max_drawdown"], float)
