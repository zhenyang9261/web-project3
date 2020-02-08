const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/traveljournals"
);

const userSeed = [
  {
    username: "user1",
    password: "password1",
    journal: [
        mongoose.Types.ObjectId("5e38d5560cf8fa6738cde4c3"),
        mongoose.Types.ObjectId("5e38d5560cf8fa6738cde4c4")
      ]
  },
  {
    username: "user2",
    password: "password2",
    journal: [
        mongoose.Types.ObjectId("5e38d5560cf8fa6738cde4c5"),
        mongoose.Types.ObjectId("5e38d5560cf8fa6738cde4c6"),
        mongoose.Types.ObjectId("5e38d5560cf8fa6738cde4c7")
      ]
  }
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
