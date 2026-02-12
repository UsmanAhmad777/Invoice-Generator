import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handlsubmit = (e) => {
    e.preventDefault();
    console.log(email, pass);

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (savedUser && savedUser.Email === email && savedUser.Pass === pass) {
      logIn(email);
      navigate("/dashbord");
    } else {
      alert("Wrong email or password");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-body px-4">
      <form
        onSubmit={handlsubmit}
        className="w-full max-w-md bg-form p-8 rounded-lg shadow"
      >
        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-2 text-center pb-2.5">
          Sign In
        </h2>

        <p className="text-center text-sm text-secondary pb-5">
          Welcome back! Please enter your details.
        </p>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            name="pass"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accentDark text-white py-2 rounded font-medium"
        >
          Sign In
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
