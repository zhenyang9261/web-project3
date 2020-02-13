const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// // Set up route for pssport and User
// const User = require('../database/models/user')
// const passport = require('../passport')

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
