import {
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <h2>CampusEats</h2>

          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/order"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Place Order
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<MenuPage />} />

        <Route
          path="/dish/:id"
          element={<DishDetailPage />}
        />

        <Route path="/order" element={<OrderPage />} />

        <Route
          path="*"
          element={
            <main className="simple-page">
              <div className="page-card">
                <h1>404</h1>
                <p>Page not found.</p>
              </div>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;