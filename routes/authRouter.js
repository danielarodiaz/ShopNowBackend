const { Router } = require("express");
const { check } = require("express-validator");
const { validate_fields } = require("../middlewares/validate_fields");
const { login } = require("../controllers/authController");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validate_fields,
  ],
  login
);

module.exports = router;
