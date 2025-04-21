import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import App from './chatRoom/App.tsx'

import GlobalStyle from './GlobalStyles.ts'
import Login from './login/Login.tsx'

import PrivateRoute from './privateRoute/PrivateRoute.tsx'
import RefreshToken from './refreshToken/RefreshToken.tsx'
import Register from './register/Register.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    
    <Router>
      <RefreshToken />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/chat' element={<PrivateRoute>
           <App />
        </PrivateRoute>} ></Route>

      </Routes>
    </Router>
  </StrictMode>,
)
