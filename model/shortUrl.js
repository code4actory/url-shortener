const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortUrl= new Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  description: String,
  dateCreated:{
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model("ShortUrl", shortUrl);