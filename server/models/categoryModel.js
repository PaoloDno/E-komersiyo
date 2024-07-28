const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
  },
  catgoryNumber: {
    type: Number,
    default: 1
  }
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;