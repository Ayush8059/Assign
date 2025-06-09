import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const ChartComponent = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("monthly");
  const [chartData, setChartData] = useState([]);
//  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/transactions/${userId}`);
        setTransactions(res.data);
      } catch (err) {
        console.error("Fetch Error", err);
      }
    };

    if (userId) fetchTransactions();
  }, [userId]);

  useEffect(() => {
    if (transactions.length > 0) {
      const grouped = groupByTime(transactions, filter);
      setChartData(grouped);
    }
  }, [transactions, filter]);

  const groupByTime = (data, type) => {
    const groups = {};

    data.forEach((txn) => {
      const date = new Date(txn.date);
      let key = "";

      if (type === "monthly") {
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      } else if (type === "yearly") {
        key = `${date.getFullYear()}`;
      } else if (type === "daily") {
        key = date.toISOString().split("T")[0]; 
      }

      if (!groups[key]) {
        groups[key] = 0;
      }
      groups[key] += txn.amount;
    });

    return Object.entries(groups).map(([key, value]) => ({ date: key, amount: value }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Transactions Overview</h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="daily">Daily</option>
      </select>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4e73df" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
