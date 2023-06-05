const { request, response } = require("express");

const validAdminRole = (req = request, res = response, next) => {
  if (!req.users) {
    return res.status(500).json({
      msg: "Se quiere validar el usuario sin tener el token",
    });
  }
  const { role, name } = req.users;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador`,
    });
  }
  next();
};

module.exports = validAdminRole;
