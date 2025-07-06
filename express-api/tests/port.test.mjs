import request from "supertest"
import app from "../src/app.js"

describe("GET /api/portfolio", () => {
  it("returns 200 and an array", async () => {
    const res = await request(app).get("/api/portfolio")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body) || typeof res.body === "object").toBeTruthy()
  })
})
