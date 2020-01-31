const router = require("express").Router();
const bookRoutes = require("./journal");

// Book routes
router.use("/journal", journalRoutes);

module.exports = router;
