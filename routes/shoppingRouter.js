const { Router } = require("express");

const { check } = require("express-validator");
const { validate_fields } = require("../middlewares/validate_fields");
const { validateJWT } = require("../middlewares/validate_JWT");
const { shoppingExists } = require("../helpers/db_validators");

const {
  shoppingGet, //listarMiCarrito
  shoppingPost, //adicionaralCarrito
  shoppingPut, //ActualizarCantidad
  shoppingDelete, //EliminarItem
} = require("../controllers/shoppingController");

const router = Router();

router.get("/", [validateJWT], shoppingGet);

router.post(
  "/",
  [
    validateJWT,
    check("cant", "La cantidad es obligatoria").notEmpty(),
    validate_fields,
  ],
  shoppingPost
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(shoppingExists),
    validate_fields,
  ],
  shoppingPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "El id no es válido").isMongoId(),
    check("id").custom(shoppingExists),
    validate_fields,
  ],
  shoppingDelete
);

module.exports = router;
