const mongoose = require('mongoose');

const StoreReportSchema = new mongoose.Schema({
  storeID: {
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

const StoreReport = mongoose.model('StoreReport', StoreReportSchema);
module.exports = StoreReport;
