import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import {Home} from "./pages/Home.jsx"
import {Createproduct} from './pages/Createproduct.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Createproduct />} />
      </Routes>
    </div>
  )
}

export default App
