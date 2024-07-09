const mongoose = require('mongoose');

const productReportSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportReason: {
    type: String,
    enum: ['Inappropriate Content', 'Fraudulent Activity', 'Spam', 'Other'],
    required: true
  },
  reportText: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const ProductReport = mongoose.model('StoreReport', productReportSchema);
module.exports = ProductReport;
