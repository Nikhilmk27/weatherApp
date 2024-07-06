import { useState } from 'react'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={<Register /> } />
        <Route path="/dashboard" element={<Dashboard /> } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
