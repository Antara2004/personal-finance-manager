const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET: Retrieve all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense({
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      paymentMethod: req.body.paymentMethod,
      date: req.body.date
    });
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
