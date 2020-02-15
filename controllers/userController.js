const db = require("../models");
const mongoose = require("mongoose");

// Defining methods for the userController
module.exports = {
  findById: function (req, res) {
    // let userId = mongoose.Types.ObjectId(req.params.id);
    
    db.User.findById(mongoose.Types.ObjectId(req.params.id))
      .populate("journal")
      .then(dbModel => { res.json(dbModel) })
      .catch(err => res.status(422).json(err));
  },
  findOne: function (req, res) {
    // let userId = mongoose.Types.ObjectId(req.params.id);
    
    // console.log("Backend id: " + req.params.id);
    db.User.findById(mongoose.Types.ObjectId(req.params.id))
      .populate("journal")
      .then(dbModel => { res.json(dbModel) })
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};