import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import History from "./pages/history/History";
import Login from "./pages/login/Login";
import MakeClaims from "./pages/make-claims/MakeClaims";
import MyClaims from "./pages/my-claims/MyClaims";
import Pending from "./pages/pending/Pending";
function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/my-claims"
            element={
              <RequireAuth>
                <MyClaims />
              </RequireAuth>
            }
          ></Route>
          <Route path="/make-claims" element={<MakeClaims />}></Route>
          <Route
            path="/history"
            element={
              <RequireAuth>
                <History />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/pending"
            element={
              <RequireAuth>
                <Pending />
              </RequireAuth>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

