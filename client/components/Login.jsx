import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Signup from './Signup'
import './Login.css'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email, password
      })
      alert(res.data.msg);
      // localStorage me userId save
    
      localStorage.setItem('userId', res.data.user.id)
      localStorage.setItem('email', res.data.user.email)
      alert('Login successful')
      navigate('/')
    } catch (err) {
      alert('Login failed')
    }
  }
  
  return (
<>
{/* <div className="flex flex-col items-center p-8 bg-red-600 min-h-screen">
      <h1 className="text-2xl mb-4 bg-red-800">Login</h1>
      <input type="email" placeholder="Email" className="border p-2 mb-2"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="border p-2 mb-4"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Login
      </button>
      <p className="mt-4">Don't have an account? <Link to="/Signup">Signup</Link></p>
    </div> */}

     <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin} className="login-button">
          Login
        </button>

        <p className="login-footer">
          Don’t have an account?{' '}
          <Link to="/Signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>

</>
  )
};

export default Login