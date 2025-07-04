import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './app/features/auth/contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  </React.StrictMode>
)
