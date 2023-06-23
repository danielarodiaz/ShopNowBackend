const { Schema, model } = require("mongoose");

const shoppingSchema = Schema({
  name: {
    type: Schema.Types.String,
    ref: "Products",
    required: true,
  },
  cant: {
    type: Number,
    required: [true, "La cantidad debe ser obligatoria"],
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
});

module.exports = model("shoppingCart", shoppingSchema);
