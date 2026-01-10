import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import Dashboard from './Components/Dashboard.jsx'
import Verify from './Components/Verify.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import VerifyReset from './Components/VerifyReset.jsx'
import Reset from './Components/Reset.jsx'
import Navbar from './Pages/Navbar.jsx'
import Contact from './Pages/Contact.jsx'
import Home from './Pages/Home.jsx'
import Footer from './Pages/Footer.jsx'
import About from './Pages/About.jsx'
import Assesment from './Pages/Assesment.jsx'
import Interview from './Pages/interview.jsx'
const App = () => {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <>
          <Home />
          <Footer />
          </>
          
          } />
        <Route path='/register' element={<><Register /><Footer /></>} />
        <Route path='/verify' element={<><Verify /><Footer /></>} />
        <Route path='/login' element={<><Login /><Footer /></>} />
        <Route path="/forgot-password" element={<><ForgotPassword /><Footer /></>} />
        <Route path="/verify-reset" element={<><VerifyReset /><Footer /></>} />
        <Route path="/reset-password" element={<><Reset /><Footer /></>} />
        <Route path='/dashboard' element={<><Dashboard /><Footer /></>} />
        <Route path='/contact' element={<><Contact /><Footer /></>} />
        <Route path='/about' element={<><About /><Footer /></>} />
        <Route path='/assesment' element={<Assesment />} />
        <Route path='/interview' element={<><Interview /><Footer /></>} />
        
      </Routes>
    </Router>
  )
}

export default App;