import React from 'react'
import { Box } from '@mui/material'

import Navbar from './components/Navbar/Navbar.jsx'
import Home from './components/Home/Home.jsx'
import Auth from './components/Auth/Auth.jsx'
import PostDetails from './components/postDetails/PostDetails.jsx'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  
  return (
    <BrowserRouter>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Navbar - Full Width */}
        <Box
          sx={{

            padding: {
              xs: '8px 16px',
              sm: '12px 24px',
         
            },
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // optional divider
          }}
        >
          <Navbar />
        </Box>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: '1799px',  // optional: set a max-width for very large screens
            margin: '0 auto',     // center the content
            padding: '16px', // consistent padding
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to='/' />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App

//  React Router v6

// | Feature         | React Router v5          | React Router v6+         |
// | --------------- | ------------------------ | ------------------------ |
// | Route container | `<Switch>`               | `<Routes>`               |
// | Routing prop    | `component` / `render`   | `element`                |
// | Redirecting     | `<Redirect to="/..." />` | `<Navigate to="/..." />` |
// | History hook    | `useHistory()`           | `useNavigate()`          |
// | Nested routes   | Defined via props        | Defined via nested JSX   |
// | `exact` prop    | Required for root paths  | No longer needed         |