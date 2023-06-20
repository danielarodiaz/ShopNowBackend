const { Router } = require("express");
const { check } = require("express-validator");

const {
  categoriesGet,
  categoryGet,
  categoryPost,
  categoryPut,
  categoryDelete,
} = require("../controllers/categoryController");

const { categoryExists } = require("../helpers/db_validators");

const { validateJWT } = require("../middlewares/validate_JWT");
const { validAdminRole } = require("../middlewares/validate_role");
const { validate_fields } = require("../middlewares/validate_fields");

const router = Router();

router.get("/", categoriesGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(categoryExists),
    validate_fields,
  ],
  categoryGet
);

router.post(
  "/",
  [
    validateJWT,
    validAdminRole,
    check("name", "El nombre es obligatorio").notEmpty(),
    validate_fields,
  ],
  categoryPost
);

router.put(
  "/:id",
  [
    validateJWT,
    validAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(categoryExists),
    check("name", "El nombre es obligatorio").notEmpty(),
    validate_fields,
  ],
  categoryPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    validAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(categoryExists),
    validate_fields,
  ],
  categoryDelete
);

module.exports = router;
