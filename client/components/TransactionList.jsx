import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactList.css'; // Assuming you have a CSS file for styling
const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem('userId');
const transactionId = localStorage.getItem('transactionId');
  const fetchTransactions = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:3000/api/transactions/${userId}`);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/transactions/delete/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    // <div className="p-4 border rounded">
    //   <h2 className="text-xl mb-2">Transactions</h2>
    //   <table className="w-full border">
    //     <thead>
    //       <tr>
    //         <th className="border p-2">Type</th>
    //         <th className="border p-2">Category</th>
    //         <th className="border p-2">Amount</th>
    //         <th className="border p-2">Note</th>
    //         <th className="border p-2">Date</th>
    //         <th className="border p-2">Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {transactions.map((t) => (
    //         <tr key={t.id}>
    //           <td className="border p-2">{t.type}</td>
    //           <td className="border p-2">{t.category}</td>
    //           <td className="border p-2">₹{t.amount}</td>
    //           <td className="border p-2">{t.note}</td>
    //           <td className="border p-2">{new Date(t.date).toLocaleDateString()}</td>
    //           <td className="border p-2">
    //             <button onClick={() => deleteTransaction(t.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>


     <div className="transaction-container">
      <h2 className="transaction-title">💰 Transactions</h2>
      <div className="transaction-table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id}>
                <td>{t.type}</td>
                <td>{t.category}</td>
                <td>₹{t.amount}</td>
                <td>{t.note}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => deleteTransaction(t._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
