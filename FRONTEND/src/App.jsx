import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import Dashboard from './Components/Dashboard.jsx'
import Verify from './Components/Verify.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import VerifyReset from './Components/VerifyReset.jsx'
import Reset from './Components/Reset.jsx'
const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/login' element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset" element={<VerifyReset />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path='/dashboard' element={<Dashboard />} />
        
      </Routes>
    </Router>
  )
}

export default App;