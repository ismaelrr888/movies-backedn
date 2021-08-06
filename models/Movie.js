const { Schema, model } = require("mongoose");

const MovieSchema = Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  programType: { type: String, require: true },
  images: {
    posterArt: {
      url: { type: String, require: true },
      width: { type: Number, require: true },
      height: { type: Number, require: true },
    },
  },
  releaseYear: { type: Number, require: true },
});

module.exports = model("Movie", MovieSchema);
