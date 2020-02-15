const router = require("express").Router();
const journalRoutes = require("./journal");
const userRoutes = require("./user");

// Journal routes
router.use("/journals", journalRoutes);

// Login routes
router.use("/user", userRoutes);

module.exports = router;
