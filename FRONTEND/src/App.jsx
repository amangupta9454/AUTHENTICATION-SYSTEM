import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Navbar from './Pages/Navbar.jsx'
import Home from './Pages/Home.jsx'
import Contact from './Pages/Contact.jsx'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import Dashboard from './Components/Dashboard.jsx'
const App = () => {
  return (
    
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        
      </Routes>
    </Router>
  )
}

export default App;