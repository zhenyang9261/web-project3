const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/traveljournals"
);

const journalSeed = [
  {
    title: "The Happy Time",
    date: new Date("2010-02-01"),
    country: "USA",
    city: "Durham",
    picURL: "https://google.com",
    rating: 4,
    publish: true,
    createdAt: new Date(Date.now())
  },
  {
    title: "Not Bad",
    date: new Date("2018-10-01"),
    country: "USA",
    city: "Dallas",
    picURL: "https://google.com",
    rating: 4,
    publish: false,
    createdAt: new Date(Date.now())
  }
];

db.Journal.remove({})
  .then(() => db.Journal.collection.insertMany(journalSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
