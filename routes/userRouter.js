const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/userController");
const {
  emailExists,
  userExists,
  validRole,
} = require("../helpers/db_validators");
const { validate_fields } = require("../middlewares/validate_fields");
const { validateJWT } = require("../middlewares/validate_JWT");
const validAdminRole = require("../middlewares/validate_role");

const router = Router();

router.get("/", userGet);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña debe tener un minimo de 6 caracteres"
    ).isLength({ min: 6 }),
    check("email", "No es un correo valido").isEmail(),
    check("email").custom(emailExists),
    check(!"role").custom(validRole),
    validate_fields,
  ],
  userPost
);
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(userExists),
    check("role").custom(validRole),
    validate_fields,
  ],
  userPut
);
router.delete(
  "/:id",
  [
    validateJWT,
    validAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(userExists),
    validate_fields,
  ],
  userDelete
);

module.exports = router;
