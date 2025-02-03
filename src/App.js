import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./config/routes";
import { useAuth } from "./contexts/authContext";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return <RouterProvider router={routerConfig} />;
}

export default App;
