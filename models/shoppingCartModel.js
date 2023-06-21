const { Schema, model } = require("mongoose");

const shoppingSchema = Schema({
  cant: {
    type: Number,
    required: [true, "La cantidad debe ser obligatoria"],
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
