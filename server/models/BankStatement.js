const mongoose = require('mongoose');

const bankStatementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  fileName: String,
  data: Array
}, { timestamps: true });

module.exports = mongoose.model('bankstatements', bankStatementSchema);
// This schema defines the structure for bank statements in the database.
// It includes a reference to the user, the file name of the bank statement,

// and an array to hold the data extracted from the bank statement.
// The timestamps option automatically adds createdAt and updatedAt fields to the schema.
// The userId field is a reference to the users collection, ensuring that each bank statement is associated with a specific user.
// The fileName field stores the name of the uploaded bank statement file,