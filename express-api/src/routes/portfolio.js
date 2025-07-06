import { Router } from "express"
import {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js"

const router = Router()

router.post("/", createPortfolio)
router.get("/", getPortfolios)
router.get("/:id", getPortfolio)
router.put("/:id", updatePortfolio)
router.delete("/:id", deletePortfolio)

export default router
