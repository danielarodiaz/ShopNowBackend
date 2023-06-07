const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../models/UserModel");

const userGet = async (req = request, res = response) => {
  const { from = 0, limit = 10 } = req.query;
  const query = { status: true };
  const [total, user] = await Promise.all([
    Users.countDocuments(query),
    Users.find(query).skip(from).limit(limit),
  ]);
  res.json({
    user,
    total,
  });
};
const userPost = async (req = request, res = response) => {
  const data = req.body;
  const { name, email, password, role } = data;
  const user = new Users({ name, email, password, role });
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  user.password = hash;
  await user.save();
  res.json({
    user,
    msg: "Usuario creado correctamente",
  });
};
const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, email, ...rest } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await Users.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "Usuario actualizado",
    user,
  });
};
const userDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const userAuthenticated = req.user;
  const user = await Users.findById(id);
  if (!user.status) {
    return res.json({
      msg: "El Usuario ya esta inactivo",
    });
  }
  const userInactivated = await Users.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({
    msg: "Usuario inactivado",
    userInactivated,
    userAuthenticated,
  });
};

module.exports = { userGet, userPost, userPut, userDelete };
