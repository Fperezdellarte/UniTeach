import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './routes/login';
import Signup from './routes/signup';
import About from './routes/about';
import HomeLogueado from './routes/homeLogueado';
import LandingPage from './routes/landingPage';
import './index.css'
import { AuthProvider } from './auth/authProvider';
import ProtectedRoute from './routes/protectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';


const Root = () => {
  return (
<BrowserRouter>
      <Navbar />
  <AuthProvider>
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<HomeLogueado/>}/>
        
    </Routes>
  </AuthProvider>
</BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

//<ProtectedRoute><HomeLogueado /></ProtectedRoute>} />  