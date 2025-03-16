const mongoose = require("mongoose"); // ✅ Import full 'mongoose'
const { PositionsSchema } = require("../schemas/PositionsSchema");

const PositionsModel = mongoose.model("position", PositionsSchema); // ✅ Now it works!

module.exports = PositionsModel; // ✅ Correct export
