import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ErrorProvider } from './components/Errors/ErrorProvider.tsx'
import './index.css'
import { CartProvider } from './services/CartProvider.tsx'
import { UserProvider } from './services/UseProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>,
)
