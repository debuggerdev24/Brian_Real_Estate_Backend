const router = require("express").Router();
const productRoutes = require("./projects");

router.use("/projects", productRoutes);

module.exports = router;
