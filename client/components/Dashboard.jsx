import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddTransaction from './AddTransaction'
import TransactionList from './TransactionList'
import'./Dashboard.css'
import ChartSummary from './ChartSummary'


const Dashboard = () => {
   const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  const fetchUserName = async () => {
    try {
      const userEmail = localStorage.getItem('email');
      if (!userEmail) return navigate('/login')
      

      const res = await axios.get(`http://localhost:3000/api/auth/email/${userEmail}`, {
        headers: {  'Content-Type': 'application/json' }
      })
      setUserName(res.data.name)
    } catch (err) {
      console.log(err)
      alert('Session expired — Please login again')
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchUserName()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    
    alert('Logged out successfully')
    navigate('/signup')
  }
const refresh = () => window.location.reload(); 
  return (
    //  <div className="p-8">
    //   <div className="flex justify-between items-center mb-6">
    //     <h1 className="text-2xl">👋 Welcome, <span className="text-blue-600 font-semibold">{userName}</span></h1>
    //     <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">🚪 Logout</button>
    //   </div>

    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //     {/* <Link to="/add-transaction" className="bg-green-500 text-white p-6 rounded text-center text-lg font-semibold shadow-lg hover:bg-green-600 transition">➕ Add Transaction</Link>
    //     <Link to="/upload-bank" className="bg-blue-500 text-white p-6 rounded text-center text-lg font-semibold shadow-lg hover:bg-blue-600 transition">📄 Upload Bank CSV</Link>
    //     <Link to="/match-results" className="bg-purple-500 text-white p-6 rounded text-center text-lg font-semibold shadow-lg hover:bg-purple-600 transition">📊 View Matches</Link> */}

    //     <AddTransaction onAdd={refresh} />
    //   <TransactionList />
    //   </div>
    // </div>


      <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>
          👋 Welcome, <span className="highlight">{userName}</span>
        </h1>
        <button onClick={handleLogout} className="logout-btn">
          🚪 Logout
        </button>
      </div>



 <div className="dashboard-actions">
        <Link to="/upload-bank" className="action-btn bg-blue-600">
          📄 Upload Bank CSV
        </Link>
        {/* <Link to="/match-results" className="action-btn bg-purple-600">
          📊 View Match Results
        </Link> */}
      </div>
      {/* Main Grid */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <AddTransaction onAdd={refresh} />
        </div>
        <div className="dashboard-card transaction-list">
          <TransactionList />
        </div>
      </div>
      <ChartSummary />
    </div>
  )
}

export default Dashboard