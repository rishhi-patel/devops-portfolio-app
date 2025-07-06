import request from "supertest"
import mongoose from "mongoose"
import app from "../src/app.js"

const testPortfolio = {
  name: "Growth Fund",
  owner: "Rishhi",
  assets: [{ ticker: "AAPL", quantity: 10, purchasePrice: 150 }],
}

beforeAll(async () => {
  const mongoUrl = "mongodb://localhost:27017/portfolio_test_db"
  await mongoose.connect(mongoUrl)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

let createdId

describe("Portfolio CRUD", () => {
  it("should create a portfolio", async () => {
    const res = await request(app).post("/api/portfolio").send(testPortfolio)
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe("Growth Fund")
    createdId = res.body._id
  })

  it("should fetch all portfolios", async () => {
    const res = await request(app).get("/api/portfolio")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("should fetch a portfolio by ID", async () => {
    const res = await request(app).get(`/api/portfolio/${createdId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body._id).toBe(createdId)
  })

  it("should update a portfolio", async () => {
    const res = await request(app)
      .put(`/api/portfolio/${createdId}`)
      .send({ name: "New Growth Fund" })
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe("New Growth Fund")
  })

  it("should delete a portfolio", async () => {
    const res = await request(app).delete(`/api/portfolio/${createdId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe("Deleted")
  })
})
