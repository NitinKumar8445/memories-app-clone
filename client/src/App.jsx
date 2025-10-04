import React from 'react'
import { Container } from '@mui/material'

import Navbar from './components/Navbar/Navbar.jsx'
import Home from './components/Home/Home.jsx'
import Auth from './components/Auth/Auth.jsx'

// React Router v6
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
