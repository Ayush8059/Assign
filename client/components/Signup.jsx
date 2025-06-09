import React from 'react'
import { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

const Signup = () => {

     const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', {
        name, email, password
      },{ headers: { 'Content-Type': 'application/json' } })
      // localStorage me userId save

      
      alert(res.data.msg, 'User created successfully')
      localStorage.setItem('userId', res.data.user.id)
      navigate('/login')
    } catch (err) {
      alert('Signup failed')
    }
  }


  return (
    <>
   {/* <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Signup</h1>
      <input type="text" placeholder="Name" className="border p-2 mb-2"
        value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" className="border p-2 mb-2"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="border p-2 mb-4"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSignup}>
        Signup
      </button>
      <p className="mt-4">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
    </div> */}


      <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSignup} className="signup-button">
          Signup
        </button>

        <p className="signup-footer">
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>

    </>
  )
}

export default Signup