import React, { useState } from "react";
import Errorpopup from "../components/Errorpopup.jsx";
import Successpopup from "../components/Successpopup.jsx";
import { useNavigate } from "react-router-dom";
function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const toggleMode = () => {
    setForm({ username: "", email: "", password: "" });
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (isSignup && !form.username)) {
      return setError("All fields are required.");
    }

    const url = isSignup ? "/signup" : "/login";
    const payload = isSignup ? form : { email: form.email, password: form.password };
    const loginUrl = import.meta.env.VITE_API_AUTH_URL;

    try {
      const res = await fetch(`${loginUrl}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) return setError(data.error);
      if (isSignup) return setSuccess(data.message);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border rounded"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button className="text-blue-600 ml-2" onClick={toggleMode}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
      {error && <Errorpopup message={error} onClose={() => setError(null)} />}
      {success && <Successpopup message={success} onClose={() => setSuccess(null)} />}
    </div>
  );
}


//  function Login() {
//     console.log("Login component rendered");
//     return(
//         <>
//         <h1>ggello</h1>
//         </>
//     )
// }

export default Login;