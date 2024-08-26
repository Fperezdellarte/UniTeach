// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './routes/login';
import Signup from './routes/signup';
import About from './routes/about';
import HomeLogueado from './routes/homeLogueado';
import Results from './routes/Results';
import LandingPage from './routes/landingPage';
import PerfilUsuario from './routes/perfilUsuario';
import './styles/index.css';
import { AuthProvider } from './auth/authProvider';
import { ClassesProvider } from './contexts/classesContext'; // Importa el ClassesProvider
import ProtectedRoute from './routes/protectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path:"/perfil",
    element: <PerfilUsuario />
  },
  {
    path: "/results",
    element: <Results />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <HomeLogueado />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
      <ClassesProvider> {/* Envuelve el RouterProvider con ClassesProvider */}
        <RouterProvider router={router}>
          <Navbar />
        </RouterProvider>
      </ClassesProvider>
    </AuthProvider>
);

