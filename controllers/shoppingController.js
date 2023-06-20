const { response, request } = require("express");
const shoppingCart = require("../models/shoppingCartModel");
const Products = require("../models/ProductsModels");

const shoppingGet = async (req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, shopping] = await Promise.all([
    shoppingCart.countDocuments(query),
    shoppingCart
      .find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "email")
      .populate("product", "name"),
  ]);

  res.json({
    total,
    shopping,
  });
};

const shoppingPost = async (req = request, res = response) => {
  //Lo que recibira por el body es la cantidad y el id del producto
  const { cant, id } = req.body;

  const productsDB = await Products.findById(id);
  if (!productsDB) {
    return res.status(400).json({
      msg: `El producto ${productsDB.id} no existe`,
    });
  }

  const data = {
    cant,
    id,
    user: req.user._id, //me mostrara el usuario que logueado
    //product: req.product._id, //id del producto
  };

  const shopping = new shoppingCart(data);

  await shopping.save();

  res.status(201).json({
    shopping,
    msg: "Compra cargada con exito!",
  });
};

const shoppingPut = async (req = request, res = response) => {
  //solamente recibo el id de la compra y actualizo la cantidad
  const { id } = req.params;
  const { cant } = req.body;

  const user = req.user._id;
  const product = req.product._id;

  const data = {
    cant,
    user,
    product,
  };

  const shopping = await shoppingCart.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(201).json({
    shopping,
    msg: "La compra se actualizó",
  });
};

const shoppingDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const shoppingInativated = await shoppingCart.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json({
    msg: `La compra ${shoppingInativated.id} se inhabilito`,
    shoppingInativated,
  });
};

module.exports = {
  shoppingGet,
  shoppingPost,
  shoppingPut,
  shoppingDelete,
};
