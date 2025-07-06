import express from "express"
import cors from "cors"
import portfolioRoutes from "./routes/portfolio.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/portfolio", portfolioRoutes)

export default app
