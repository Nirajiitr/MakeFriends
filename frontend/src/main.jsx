import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from './context/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <UserProvider>
       <App />
    </UserProvider>
    <Toaster />
  </React.StrictMode>,
)
