import mongoose from "mongoose"

const PortfolioSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    assets: [
      {
        ticker: String,
        quantity: Number,
        purchasePrice: Number,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model("Portfolio", PortfolioSchema)
