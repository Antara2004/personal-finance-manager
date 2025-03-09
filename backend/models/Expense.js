const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  paymentMethod: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
