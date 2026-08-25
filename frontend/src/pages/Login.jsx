import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const googleDiv = document.getElementById("googleLoginDiv");

    if (window.google && googleDiv) {
      googleDiv.innerHTML = ""; // prevents duplicate buttons

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(googleDiv, {
        theme: "outline",
        size: "large",
        width: 300,
      });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await API.post("/auth/login", {
        email,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      await API.post("/auth/google", { token });

      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 px-4">
      <Card className="w-full max-w-md p-8 bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-900">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <div className="flex flex-col items-center gap-4 mb-4">
          <div id="googleLoginDiv"></div>

          <div className="flex items-center w-full text-sm text-slate-400">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="mx-2">or</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-sm"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
