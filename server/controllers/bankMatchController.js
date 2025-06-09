const parseCSV = require('../utils/parseCSV');
const Transaction = require('../models/Transaction');
const BankStatement = require('../models/BankStatement');
const matchTransactions = require('../utils/matchLogic');
const generateMatchPDF = require('../utils/generatePDF');


exports.uploadAndMatchBankStatement = async (req, res) => {
  try {
    console.log(req.file);
  console.log(req.body.userId);
    const filePath = req.file.path;
    const userId = req.body.userId;

    // CSV read
    const bankData = await parseCSV(filePath);

    // User ke transactions nikal lo
    const userTransactions = await Transaction.find({ userId });

    // Matching logic
    const result = matchTransactions(bankData, userTransactions);

    // DB me BankStatement save
    await BankStatement.create({
      userId,
      fileName: req.file.filename,
      data: bankData
    });

    // ✅ Yahan PDF bana lo
    const pdfPath = await generateMatchPDF(userId, result.matched, result.unmatched);

    // Response
    res.status(200).json({
      message: 'Bank statement uploaded and matched!',
      matched: result.matched,
      unmatched: result.unmatched,
      pdfDownloadLink: pdfPath
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.msg });
  }
};


// exports.getBankStatements = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const statements = await BankStatement.find({ userId });
//     res.status(200).json(statements);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
// exports.deleteBankStatement = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await BankStatement.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Bank statement deleted successfully' });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
// exports.updateBankStatement = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedStatement = await BankStatement.findBy
// IdAndUpdate(id, req.body, { new: true });
//     res.status(200).json(updatedStatement);     
// }

//     catch (err) {
//         res.status(400).json({ message: err.message });
//     }
//     };  
// This code handles the upload and matching of bank statements with user transactions.
// It uses a utility function to parse CSV files and another utility function to match transactions.
// The `uploadAndMatchBankStatement` function processes the uploaded bank statement,
// retrieves user transactions, matches them, and saves the bank statement to the database.