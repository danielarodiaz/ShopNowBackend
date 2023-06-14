const { response, request } = require("express");
const Products = require("../models/ProductsModels");

const productsGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, Products] = await Promise.all([
    Products.countDocuments(query),
    Products.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("Users", "email")
      .populate("Category", "name"),
  ]);

  res.json({
    total,
    Products,
  });
};

const productGet = async (req = request, res = response) => {
  const { id } = req.params;

  const Products = await Products.findById(id)
    .populate("User", "email")
    .populate("Category", "name");


  res.json({
    Products
  });
};


const productPost = async (req = request, res = response) => {
  const {  description, category, price, img, status} = req.body;
  const name = req.body.name.toUpperCase();

  const productsDB = await Products.findOne({ name });

  if (productsDB) {
    return res.status(400).json({
      msg: `El producto ${productsDB.name} ya existe`,
    });
  }

 
  const data = {
    name,
		description,
		category,
		price,
		img,
		status,
    users :req.users._id
  };

  const product = new Products(data);
  
  await product.save();

  res.status(201).json({
    product,
    msg: "Producto creado con exito!",
  });
};


const productPut = async (req=request, res=response) => {
  const { id } = req.params;
  const { description, category, price, img, status } = req.body;

  const user = req.users._id;

  const data = {
    description,
		category,
		price,
		img,
		status,
    user,
  };

  if (req.body.name) {
    data.name = req.body.name.toUpperCase();
  }

  const product = await Products.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    product,
    msg: "El producto se actualizó",
  });
};


const productDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const productInativated = await Products.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json({
    msg: `El producto ${productInativated.name} se borro`,
  });
};

module.exports = {
  productsGet,
  productGet,
  productPost,
  productPut,
  productDelete,
};
