const { response, request } = require("express");
const Categoria = require("../models/category");
const category = require("../models/category");

const obtenerCategorias = async (req = request, res = response) => {
  const { desde = 0, limite = 5 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    category.countDocuments(query),
    Categoria.find(query)
      .skip(desde)
      .limit(limite)
      .populate("usuario", "correo"),
  ]);

  res.json({
    total,
    category,
  });
};

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await category.findById(id).populate(
    "usuario",
    "nombre correo"
  );

  res.json({
    category,
  });
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await category.findOne({ nombre });

  if (categoriaDB) {
    res.status(400).json({
      msg: `La categoría ${categoriaDB.nombre} ya existe`,
    });
  }

 
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new category(data);

  await categoria.save();

  res.status(201).json({
    categoria,
    msg: "la categoria fue creada con exito!",
  });
};

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();
  const usuario = req.usuario._id;

  const data = {
    nombre,
    usuario,
  };

  const categoria = await category.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "Categoría actualizada",
    categoria,
  });
};

const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoriaborrada = await category.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    categoriaborrada,
    msg: "La categoría fue eliminada",
  });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};
