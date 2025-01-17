import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cryptocurrency: { type: String, required: true },
    currencySymbol: { type: String, required: true },
    priceThreshold: { type: Number, required: true },
    thresholdType: { type: String, enum: ['price-increase', 'price-decrease'], required: true },
    isTriggered: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  });
  
  export default mongoose.model('Alert', alertSchema);
  