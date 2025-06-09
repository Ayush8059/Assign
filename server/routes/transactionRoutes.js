const express = require('express');
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getTransactionById
} = require('../controllers/transactionController');
const router = express.Router();
// Route to add a new transaction
router.post('/add', addTransaction);
// Route to get all transactions for a user 
router.get('/:userId', getTransactions);
// Route to delete a transaction by ID
router.delete('/delete/:id', deleteTransaction);
// Route to update a transaction by ID

router.put('/update/:id', updateTransaction);
// Route to get a transaction by ID
router.get('/transaction/:id', getTransactionById);
// Export the router
module.exports = router;
