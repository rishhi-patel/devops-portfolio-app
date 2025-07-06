import mongoose from "mongoose"
import Portfolio from "../models/portfolio.js"

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)

export const createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body)
    res.status(201).json(portfolio)
  } catch (err) {
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation failed", details: err.errors })
    }
    res.status(500).json({ error: "Server error" })
  }
}

export const getPortfolios = async (_req, res) => {
  try {
    const all = await Portfolio.find()
    res.json(all)
  } catch (err) {
    console.error("Error fetching portfolios:", err)
    res.status(500).json({ error: "Server error" })
  }
}

export const getPortfolio = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid portfolio ID" })
  }
  try {
    const portfolio = await Portfolio.findById(req.params.id)
    if (!portfolio)
      return res.status(404).json({ error: "Portfolio not found" })
    res.json(portfolio)
  } catch (err) {
    console.error("Error fetching portfolio:", err)
    res.status(500).json({ error: "Server error" })
  }
}

export const updatePortfolio = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid portfolio ID" })
  }
  try {
    const updated = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ error: "Portfolio not found" })
    res.json(updated)
  } catch (err) {
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation failed", details: err.errors })
    }
    res.status(500).json({ error: "Server error" })
  }
}

export const deletePortfolio = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid portfolio ID" })
  }
  try {
    const deleted = await Portfolio.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Portfolio not found" })
    res.json({ message: "Deleted" })
  } catch (err) {
    console.error("Error deleting portfolio:", err)
    res.status(500).json({ error: "Server error" })
  }
}
