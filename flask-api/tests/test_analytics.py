from app import app


def test_analytics(client):
    response = client.get("/analytics")
    assert response.status_code == 200
    data = response.get_json()
    assert "avgReturn" in data and "maxReturn" in data
    # quick sanity range check
    assert 0 <= data["avgReturn"] <= data["maxReturn"] <= 1
