import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </CurrencyProvider>
  </React.StrictMode>
);

