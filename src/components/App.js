import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css'; // Archivo CSS personalizado donde definirás los estilos para el modo oscuro

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <html className={darkMode ? "dark" : ""}>
      <body>
        <div className={`container ${darkMode ? "dark-container" : ""}`}>
          <Button variant="primary" onClick={toggleDarkMode}>
            {darkMode ? "Desactivar modo oscuro" : "Activar modo oscuro"}
          </Button>
          <div className={`bg-white ${darkMode ? "dark-bg-black" : ""}`}>
            Contenido
          </div>
        </div>
      </body>
    </html>
  );
}

export default App;
