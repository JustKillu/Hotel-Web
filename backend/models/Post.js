const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: String,
  excerpt: String,
  image: String,
  link: String
});

module.exports = mongoose.model('Posts', PostSchema);
