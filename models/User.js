const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: false },
    strategy: { type: String, required: true },
    picture: { type: String, required: false },
    visualisations: [{ type: Schema.Types.ObjectId, ref: "Visualisation" }],
  },
  {
    timestamps: true,
  }
);
// mongoose compiles Schema defition to a model.
const User = model("User", userSchema);

module.exports = User;
