const Users = require("../models/UserModel");
const Roles = require("../models/RoleModel");
const emailExists = async (email) => {
  const existsEmail = await Users.findOne({ email });
  if (existsEmail) {
    throw new Error(`El correo ${email} ya se encuentra en la base de datos`);
  }
};
const userExists = async (id) => {
  const existsUser = await Users.findById(id);
  if (!existsUser) {
    throw new Error(`El ID ${id} no se encuentra en la base de datos`);
  }
};
const validRole = async (role) => {
  const existsRole = await Roles.findOne({ role });
  if (!existsRole) {
    throw new Error(`El rol ${role} no existe en la base de datos`);
  }
};

module.exports = { emailExists, userExists, validRole };
