import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { appRoutes } from './config/menuConfig';
import Content from './Content';
import ProtectedRoute from './services/ProtectedRoute';
import { useAuth } from './services/useAuth';

function App() {
  const { user } = useAuth();
  const esAdmin = user?.rol === "admin";
  const esEmpleado = user?.rol === "empleado";

  const rutasFiltradas = appRoutes.filter(route =>
    route.menu === true &&
    (
      (esAdmin && route.admin === true) ||
      (esEmpleado && route.empleado === true)
    )
  );

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          <Route
            path="/"
            element={appRoutes.find(route => route.path === "/")?.element}
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
                  <ProtectedRoute
                    onlyAdmin={route.admin === true}
                    onlyEmpleado={route.empleado === true}
                  >
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
    </BrowserRouter>
  );
}

export default App
