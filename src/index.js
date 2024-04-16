import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './routes/login.js';
import Signup from './routes/signup.js';
import About from './routes/about.js';
import HomeLogueado from './routes/homeLogueado.js';

const router = createBrowserRouter([
  { 
    path:"/",
    element: <App/>
  },
  {
    path:"/login",
   element:<Login/>
  },
  {
    path:"/signup",
    element: <Signup/>
  },
  { 
    path:"/about",
    element: <About/>
  },
  {
    path: "/home",
        element:<HomeLogueado/>

  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
