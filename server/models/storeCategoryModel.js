const mongoose = require('mongoose');

const StoreCategorySchema = new mongoose.Schema({
  storeCategoryName: {
    type: String,
    required:true,
    unique: true
  }
});

const StoreCategory = mongoose.model('StoreCategory', StoreCategorySchema);