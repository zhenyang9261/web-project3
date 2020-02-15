const db = require("../models");

// Defining methods for the JournalsController
module.exports = {
  findAll: function (req, res) {
    //db.Journal.find(req.query)
    db.Journal.find({ publish: true })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Journal.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByCountry: function (req, res) {
    db.Journal.find({ country: req.params.country })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByRating: function (req, res) {
    db.Journal.find({ rating: req.params.rating, publish: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let userId = req.body.userId;

    delete req.body["userId"];

    db.Journal.create(req.body)
      .then(function (dbJournal) {

        return db.User.findOneAndUpdate(
          //{ _id: mongoose.Types.ObjectId(userId) },
          { _id: userId },
          { $push: { journal: dbJournal._id } },
          { new: true }
        );
      })
      .then(dbJournal => res.status(200).end())
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Journal.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Journal.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
