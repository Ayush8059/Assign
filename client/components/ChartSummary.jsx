import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const ChartSummary = ({ userId }) => {
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState('monthly')

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/api/transactions/${userId}`)
      setTransactions(res.data)
    }
    fetchData()
  }, [userId])

  const groupData = () => {
    const map = {}

    transactions.forEach(txn => {
      const date = new Date(txn.date)
      const key = filter === 'yearly'
        ? date.getFullYear()
        : filter === 'monthly'
        ? `${date.getFullYear()}-${date.getMonth() + 1}`
        : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

      if (!map[key]) map[key] = 0
      map[key] += Number(txn.amount)
    })

    return Object.entries(map).map(([key, value]) => ({ name: key, amount: value }))
  }

  return (
    <div>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="daily">Daily</option>
      </select>

      <BarChart width={600} height={300} data={groupData()}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </div>
  )
}

export default ChartSummary
