import React, { useState } from 'react';
import axios from 'axios';
import './AddTransaction.css'; // Assuming you have a CSS file for styling

const AddTransaction = ({ onAdd }) => {
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');


  const handleAdd = async () => {
    if (!userId) return alert('User not logged in');

    try {
      const res = await axios.post('http://localhost:3000/api/transactions/add', {
        userId, type, category, amount, note, date, 
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
    // localStorage.setItem('userId', res.data.data.id)
      alert( 'Transaction added successfully');
      onAdd();  // refresh table
    } catch (err) {
      console.error(err);
      alert('Failed to add transaction');
    }
  };

  return (
    // <div className="p-4 border rounded mb-4">
    //   <h2 className="text-xl mb-2">Add Transaction</h2>
    //   <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 mb-2">
    //     <option value="income">Income</option>
    //     <option value="expense">Expense</option>
    //   </select>
    //   <input type="text" placeholder="Category" className="border p-2 mb-2 ml-2"
    //     value={category} onChange={(e) => setCategory(e.target.value)} />
    //   <input type="number" placeholder="Amount" className="border p-2 mb-2 ml-2"
    //     value={amount} onChange={(e) => setAmount(e.target.value)} />
    //   <input type="text" placeholder="Note" className="border p-2 mb-2 ml-2"
    //     value={note} onChange={(e) => setNote(e.target.value)} />
    //   <input type="date" className="border p-2 mb-2 ml-2"
    //     value={date} onChange={(e) => setDate(e.target.value)} />
    //   <button onClick={handleAdd} className="bg-green-500 text-white p-2 ml-2 rounded">Add</button>
    // </div>



     <div className="add-transaction-container">
      <h2 className="add-transaction-title">➕ Add Transaction</h2>
      <div className="add-transaction-form">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default AddTransaction;
