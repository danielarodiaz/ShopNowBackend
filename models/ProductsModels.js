const { Schema, model } = require("mongoose");

const productSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
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
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  descripcion: {
    type: String,
  },
  img: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Products", productSchema);
