import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './DashboardModern.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { appRoutes } from './config/menuConfig';
import Content from "./Content";
import ProtectedRoute from './services/ProtectedRoute';
import { useAuth } from './services/useAuth';

function App() {
  const { user } = useAuth();
  const esAdmin = user?.rol === "admin";

  const rutasFiltradas = appRoutes.filter(route =>
    esAdmin
      ? route.menu === true && route.admin === true
      : route.menu === true && route.admin !== true
  );

  return (
    <Router>
      <div className="App">
        <Routes>

          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          <Route
            path="/login"
            element={appRoutes.find(route => route.path === "/login")?.element}
          />

          {rutasFiltradas.map((route) => (
            <Route
              key={route.path}
              element={<Content route={route} />}>
              <Route
                path={route.path}
                element={
                  <ProtectedRoute onlyAdmin={route.admin === true}>
                    <div className="dashboard-modern">
                      <main className="main-modern">
                        <div className="dashboard-content">

                          {route.element}
                        </div>
                      </main>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Route>
          ))}

        </Routes>
      </div>
    </Router>
  );
}

export default App
