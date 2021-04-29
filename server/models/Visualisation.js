const { Schema, model } = require("mongoose");

const visSchema = new Schema({
  name: { type: String, required: true },
  data: { type: Array, default: [] },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Visualisation = model("Visualisation", visSchema);

module.exports = Visualisation;
