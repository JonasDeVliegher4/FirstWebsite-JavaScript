import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./contexts/Theme.context.jsx";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AfsprakenList from "./pages/afspraken/AfsprakenList.jsx";
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import AddOrEditAfspraken from "./pages/afspraken/AddOrEditAfspraken.jsx";
import TypeAfsprakenList from "./pages/typeAfspraken/TypeAfsprakenList.jsx";
import NotFound from "./components/NotFound.jsx";
import { AuthProvider } from './contexts/Auth.context';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/afspraken"/>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: 'afspraken',
        element: <PrivateRoute />, 
        children: [
          {
            index: true,
            element: <AfsprakenList/>,
          },
          {
            path: 'add',
            element: <AddOrEditAfspraken/>
          },
          {
            path: 'edit/:id',
            element: <AddOrEditAfspraken/>
          },
        ],
      },
      {
        path: '/soortenAfspraken',
        children: [
          {
            index: true,
            element: <TypeAfsprakenList/>
          }
        ]
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
