const { request, response } = require("express");

const validAdminRole = (req = request, res = response, next) => {
  const { role, name } = req.users;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador`,
    });
  }
  next();
};

module.exports = validAdminRole;
