const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getMovies } = require("../controllers/movie");

const router = Router();

router.use(validateJWT);

router.get("/", getMovies);

module.exports = router;
