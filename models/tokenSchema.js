const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema(
  {
    token: { type: String },
    expiredDate: { type: Date },
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "staff" },
  },
  { timestamps: true }
);
const Token = mongoose.model('token' , tokenSchema)

module.exports = Token;