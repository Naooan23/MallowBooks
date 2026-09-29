import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorProvider } from './components/Errors/ErrorProvider.jsx';
import './index.css';
import { CartProvider } from './services/CartProvider.jsx';
import { UserProvider } from "./services/UseProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);