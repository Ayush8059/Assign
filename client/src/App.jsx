import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Dashboard from '../components/Dashboard'
import AddTransaction from '../components/AddTransaction'
import UploadBank from '../components/UploadBank'
import './index.css'
import './App.css'



function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Dashboard />} />
         <Route path="/add-transaction" element={<AddTransaction />} />
         <Route path="/upload-bank" element={<UploadBank userId={localStorage.getItem('userId')} />} />

      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
