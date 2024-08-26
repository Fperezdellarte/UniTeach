import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './routes/login';
import Signup from './routes/signup';
import About from './routes/about';
import HomeLogueado from './routes/homeLogueado';
import Results from './routes/Results';
import  PerfilMentor from './routes/perfilMentor';
import LandingPage from './routes/landingPage';
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
    path: "/",
    element: (
      <ProtectedRoute>
        <Navbar /> {/* Navbar ahora está dentro de ProtectedRoute */}
        <Outlet /> {/* Muestra los componentes hijos aquí */}
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/home",
        element: <HomeLogueado />
      },
      {
        path: "/results",
        element: <Results />
      },
      {
        path: "/perfilMentor/:id",
        element: <PerfilMentor/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ClassesProvider>
      <RouterProvider router={router} />
    </ClassesProvider>
  </AuthProvider>
);


