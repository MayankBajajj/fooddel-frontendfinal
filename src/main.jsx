import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // <--- Check this path
import { BrowserRouter } from 'react-router-dom';
import './index.css' // <--- Check if this file exists// <--- MUST BE IMPORTED
import StoreContextProvider from './context/StoreContext.jsx'; 

// ... later in the render function:
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter> {/* <--- MUST WRAP APP */}
      <StoreContextProvider>
        <App />

      </StoreContextProvider>
        
    </BrowserRouter>
);