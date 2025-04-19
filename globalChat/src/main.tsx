import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import App from './chatRoom/App.tsx'

import GlobalStyle from './GlobalStyles.ts'
import OpenSettings from './settings/Settings.tsx'
import Login from './login/Login.tsx'

import PrivateRoute from './privateRoute/PrivateRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        
        <Route path="/settings" element={<PrivateRoute>
           <OpenSettings />
        </PrivateRoute>} />

        <Route path='/chat' element={<PrivateRoute>
           <App />
        </PrivateRoute>} ></Route>

      </Routes>
    </Router>
  </StrictMode>,
)
