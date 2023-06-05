const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../models/UserModel");
const { generateJWT } = require("../helpers/generate_JWT");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Correo o password incorrectos",
      });
    }
    if (!user.status) {
      return res.status(400).json({
        msg: "Correo o password incorrectos | usuario inactivo",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo o password incorrectos",
      });
    }
    const token = await generateJWT(user.id);

    res.json({
      msg: "Login OK",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { login };
