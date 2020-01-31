const router = require("express").Router();
const journalControler = require("../../controllers/journalController");

// Matches with "/api/books"
router
  .route("/")
  .get(journalControler.findAll)
  .post(journalControler.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(journalControler.findById)
  .put(journalControler.update)
  .delete(journalControler.remove);

module.exports = router;
