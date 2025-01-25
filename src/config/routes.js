import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../routes/protectedRoute";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import LandingPage from "../routes/landingPage/landingPage";
import Login from "../routes/auth/login/login";
import Signup from "../routes/auth/signup/signup";
import { About } from "../routes/about/About";
import { Clases } from "../routes/app/clasesDetail/Clases";
import { ResetPassword } from "../routes/auth/resetPassword/ResetPassword";
import { SendMail } from "../routes/auth/SendMail/SendMail";
import { HomeLogueado } from "../routes/app/homeLogueado/HomeLogueado";
import { Results } from "../routes/app/results/Results";
import PerfilMentor from "../routes/app/perfilMentor/perfilMentor";
import { PerfilUsuario } from "../routes/app/perfilUsuario/PerfilUsuario";
import NotFound from "../routes/404/404";
import GuestOnlyRoute from "../routes/GuestOnlyRoute";

export const routerConfig = createBrowserRouter(
  [
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "about", element: <About /> },
        //rutas para los usuarios no logueados
        {
          element: <GuestOnlyRoute />,
          children: [
            { path: "auth/login", element: <Login /> },
            { path: "auth/signup", element: <Signup /> },
            { path: "auth/reset-password/:token", element: <ResetPassword /> },
            { path: "auth/email-form", element: <SendMail /> },
          ],
        },
      ],
    },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <PrivateLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="home" replace />,
        },
        {
          path: "home",
          element: <HomeLogueado />,
        },
        {
          path: "perfil",
          element: <PerfilUsuario />,
        },
        {
          path: "results",
          element: <Results />,
        },
        {
          path: "perfilMentor/:id",
          element: <PerfilMentor />,
        },
        {
          path: "clases",
          element: <Clases />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
