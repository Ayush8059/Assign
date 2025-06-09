function matchTransactions(bankData, userTransactions) {
  const matched = [];
  const unmatched = [];

  bankData.forEach(bankTxn => {
    const bankDate = bankTxn.date.substring(0, 10); // assume bankTxn.date is string

    const match = userTransactions.find(txn => {
      const txnDate =
        typeof txn.date === 'string'
          ? txn.date.substring(0, 10)
          : txn.date.toISOString().substring(0, 10);

      const amountMatch = Number(txn.amount) === Number(bankTxn.amount);
      const noteMatch = txn.note?.toLowerCase() === bankTxn.note?.toLowerCase();
      const dateMatch = txnDate === bankDate;

      return amountMatch && noteMatch && dateMatch;
    });

    if (match) {
      matched.push(bankTxn);
    } else {
      unmatched.push(bankTxn);
    }
  });

  return { matched, unmatched };
}

module.exports = matchTransactions;

// This function compares bank statements with user transactions
// and returns matched and unmatched transactions.  
// It checks if the amount and date of the transactions match.
// If a match is found, it adds the transaction to the matched array
// with a status of 'Matched', otherwise it adds it to the unmatched array
// with a status of 'Unmatched'. The function returns an object
// containing both matched and unmatched transactions.
// The function assumes that both bank statements and user transactions
// are arrays of objects, where each object has an 'amount' and 'date' property.
// The date is compared in the format 'YYYY-MM-DD'.
// The function can be used to help users reconcile their bank statements
// with their recorded transactions, making it easier to identify discrepancies.
// This utility can be particularly useful for financial applications
// where users need to track their expenses and income against their bank records.
// It can be integrated into a larger application where users can upload their bank statements
// and view matched and unmatched transactions, helping them to manage their finances more effectively.
// The function can be extended to include more complex matching logic,
