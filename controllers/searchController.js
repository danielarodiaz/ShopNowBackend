const { request, response } = require("express");

const Users = require("../models/UserModel");
const Categories = require("../models/categoryModel");
const Products = require("../models/ProductsModels");


const collectionPermit = ["users", "categories", "products"];

const searchUsers = async (term, res = response) => {
  const regex = new RegExp(term, "i");
  const user = await Users.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });
  res.json({
    results: user,
  });
};
const searchCategories = async (term, res = response) => {
  const regex = new RegExp(term, "i");
  const category = await Categories.find({
    name: regex,
    status: true,
  });
  res.json({
    results: category,
  });
};
const searchProducts = async (term, res = response) => {
  const regex = new RegExp(term, "i");
  const product = await Products.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ status: true }],
  });
  res.json({
    results: product,
  });
};

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!collectionPermit.includes(collection)) {
    return res.status(401).json({
      msg: `Las colecciones permitidas son: ${collectionPermit}`,
    });
  }
  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    default:
      res.status(500).json({
        msg: "Hubo un error al hacer la búsqueda.",
      });
      break;
  }
};

module.exports = { search };
