const { default: mongoose } = require('mongoose');
const Transaction = require('../models/Transaction');

// ✅ Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const { userId, type, category, amount, note, date } = req.body;
    if (!userId || !type || !category || !amount) {
      return res.status(400).json({ message: 'All fields are required' });

    }
    if(!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });


    }

    const newTransaction = await Transaction.create({
      userId, type, category, amount, note, date
    });

    res.status(201).json({ message: 'Transaction Added', data: newTransaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Transactions for User
exports.getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: 'Transaction Deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// ✅ Get Transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }   
    res.status(200).json(transaction);
    }
    catch (error) {
    res.status(400).json({ message: error.message });
    }};

