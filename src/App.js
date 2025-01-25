import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./config/routes";
import { useAuth } from "./auth/authProvider";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return <RouterProvider router={routerConfig} />;
}

export default App;
