import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/me");
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.log("Logout failed");
    }
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <h1
          className="text-lg font-bold tracking-tight cursor-pointer text-slate-900 flex items-center gap-2 hover:text-indigo-600 transition"
          onClick={() => navigate("/dashboard")}
        >
          <span className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
            AI
          </span>
          AI Interview Simulator
        </h1>

        <div className="flex items-center gap-8 text-sm font-medium">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/problems"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            }
          >
            Problems
          </NavLink>

          <NavLink
            to="/submissions"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            }
          >
            Submissions
          </NavLink>

          <NavLink
            to="/interview"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            }
          >
            Interview
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            }
          >
            Analytics
          </NavLink>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
