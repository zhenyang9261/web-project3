const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  journal: [
    {
      type: Schema.Types.ObjectId,
      ref: "Journal"
    }
  ]
});

const User = mongoose.model("User", journalSchema);

module.exports = User;
