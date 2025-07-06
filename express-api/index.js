import mongoose from "mongoose"
import app from "./src/app.js"

const PORT = process.env.PORT || 3000
const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost:27017/portfolio_db"

mongoose.connect(mongoUrl).then(() => {
  console.log("Mongo connected")
  app.listen(PORT, () => console.log(`Express API on ${PORT}`))
})
