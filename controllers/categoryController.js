const { response, request } = require("express");
const Categories = require("../models/categoryModel");

const categoriesGet = async (req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Categories.countDocuments(query),
    Categories.find(query).skip(from).limit(limit).populate("user", "email"),
  ]);

  res.json({
    total,
    categories,
  });
};

const categoryGet = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Categories.findById(id).populate("user", "name email");

  res.json({
    category,
  });
};

const categoryPost = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Categories.findOne({ name });

  if (categoryDB) {
    res.status(400).json({
      msg: `La categoría ${categoryDB.name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Categories(data);

  await category.save();

  res.status(201).json({
    category,
    msg: "la categoria fue creada con exito!",
  });
};

const categoryPut = async (req = request, res = response) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();
  const user = req.user._id;

  const data = {
    name,
    user,
  };

  const category = await Categories.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "Categoría actualizada",
    category,
  });
};

const categoryDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const categoryInactivated = await Categories.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json({
    categoryInactivated,
    msg: "La categoría fue eliminada",
  });
};

module.exports = {
  categoriesGet,
  categoryGet,
  categoryPost,
  categoryPut,
  categoryDelete,
};
