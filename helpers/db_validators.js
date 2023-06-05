const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const emailExists = async (email) => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error(`El correo ${email} ya se encuentra en la base de datos`);
  }
};
const userExists = async (id) => {
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`El ID ${id} no se encuentra en la base de datos`);
  }
};
const validRole = async (role) => {
  //Toda consulta que se hara a la bd debe ser asincrona
  const existsRole = await Role.findOne({ role }); //busca el campo rol del rol que estoy recibiendo como parametro que es el que coloca el usuario; rol:rol
  if (!existsRole) {
    //como no recibimos el req ni res, usamos el throw new Error
    throw new Error(`El rol ${role} no existe en la base de datos`);
  }
};

module.exports = { emailExists, userExists, validRole };
