const router = require("express").Router();
const journalController = require("../../controllers/journalController");
const userController = require("../../controllers/userController");

// Matches with "/api/books"
router
  .route("/")
  .get(journalController.findAll)
  .post(journalController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(journalController.findById)
  .put(journalController.update)
  .delete(journalController.remove);

// Matches with "/api/journals/country/:country"
router
  .route("/country/:country")
  .get(journalController.findByCountry);

// Matches with "/api/journals/rating/:rating"
router
  .route("/rating/:rating")
  .get(journalController.findByRating);

// Matches with "/api/journals/user/:id"
router
  .route("/user/:id")
  .get(userController.findById);

module.exports = router;
