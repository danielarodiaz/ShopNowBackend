const { Router } = require("express");

const { check } = require("express-validator");
const { validate_fields } = require("../middlewares/validate_fields");
const { validateJWT } = require("../middlewares/validate_JWT");
const { validAdminRole } = require("../middlewares/validate_role");
const { productExists } = require("../helpers/db_validators");

const {
  productGet,
  productPost,
  productPut,
  productDelete,
} = require("../controllers/productController");

const router = Router();

router.get("/",[validateJWT] );
router.get(
  "/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(productExists),
    validate_fields,
  ],
  productGet
);

router.post(
  "/",
  [
    validateJWT,
    validAdminRole,
    check("name", "El nombre es obligatorio").notEmpty(),
    validate_fields,
  ],
  productPost
);

router.put(
  "/:id",
  [
    validateJWT,
    validAdminRole,
    check("id", "El id no es válido").isMongoId(),
  
    check("id").custom(productExists),
    validate_fields,
  ],
  productPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    validAdminRole,
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(productExists),
    validate_fields,
  ],
  productDelete
);

module.exports = router;
