const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/traveljournals"
);

const journalSeed = [
  {
    title: "Happy Time",
    date: new Date("2010-02-01"),
    country: "USA",
    city: "Durham",
    picURL: "https://google.com",
    rating: 4,
    publish: true,
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat feugiat est at dignissim. Ut sed quam sapien. Donec augue metus, consequat et urna in, condimentum finibus ipsum. Aliquam leo quam, gravida consequat ligula et, convallis cursus lectus. Aliquam at convallis nibh, et iaculis massa.",
    createdAt: new Date(Date.now())
  },
  {
    title: "Family Reunion",
    date: new Date("2018-10-01"),
    country: "USA",
    city: "Dallas",
    picURL: "https://google.com",
    rating: 4,
    publish: false,
    note: "Proin non mauris non quam pharetra tincidunt ac vel nisl. Donec bibendum est ornare, auctor ligula non, iaculis nisi. Sed quis aliquam eros, ac rhoncus turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel metus vestibulum, ultricies libero vitae, ornare ligula.",
    createdAt: new Date(Date.now())
  },
  {
    title: "Revisit",
    date: new Date("2017-06-01"),
    country: "Canada",
    city: "Ottawa",
    picURL: "https://google.com",
    rating: 5,
    publish: false,
    note: "Nam maximus, mi et varius ultricies, felis lacus tincidunt nisi, sit amet scelerisque ante lacus a lorem. Etiam aliquet urna a elit hendrerit, a volutpat tortor mollis. Aenean finibus varius orci sed aliquam. Ut consequat interdum euismod. Vestibulum sagittis tellus justo, id luctus lacus elementum ut.",
    createdAt: new Date(Date.now())
  },
  {
    title: "Hottest Summer",
    date: new Date("2007-07-03"),
    country: "Singapore",
    city: "Singapore",
    picURL: "https://google.com",
    rating: 2,
    publish: true,
    note: "Sed vulputate sapien turpis, eu hendrerit lacus rutrum non. Integer consequat mi eget feugiat scelerisque. Praesent feugiat mauris quis ante tempor pulvinar. Curabitur vel placerat massa. In elit massa, iaculis at fermentum vestibulum, eleifend nec sapien. Curabitur nulla tellus, iaculis id ipsum sit amet, sagittis dapibus diam.",
    createdAt: new Date(Date.now())
  },
  {
    title: "Amazing!",
    date: new Date("2005-05-03"),
    country: "France",
    city: "Paris",
    picURL: "https://google.com",
    rating: 5,
    publish: true,
    note: "Sed vulputate sapien turpis, eu hendrerit lacus rutrum non. Integer consequat mi eget feugiat scelerisque. Praesent feugiat mauris quis ante tempor pulvinar. Curabitur vel placerat massa. In elit massa, iaculis at fermentum vestibulum, eleifend nec sapien. Curabitur nulla tellus, iaculis id ipsum sit amet, sagittis dapibus diam.",
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
