const mongoose = require("mongoose");
const { HoldingsSchema } = require("../schemas/HoldingsSchema");

const HoldingsModel = mongoose.model("holding", HoldingsSchema); // ✅ Correct way

module.exports = HoldingsModel; // ✅ Direct export
