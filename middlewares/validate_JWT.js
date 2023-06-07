const { request, response } = require("express");
const Users = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await Users.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: "Token no valido - Usuario no existe",
      });
    }
    if (!user.status) {
      return res.status(401).json({
        msg: "Token no valido - Usuario inactivo",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validateJWT,
};
