const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { loginUser, createUser, validateToken } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.get("/renew", validateJWT, validateToken);

module.exports = router;
