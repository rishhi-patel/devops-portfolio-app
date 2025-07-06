import express from "express"
import cors from "cors"
import portfolioRoutes from "./routes/portfolio.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/portfolio", portfolioRoutes)

app.get("/", (req, res) => {
  res.send("Express API is running")
})

export default app
