import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SignUp() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Pass: "",
    Country: "",
    Terms: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // register a user
    localStorage.setItem("registeredUser", JSON.stringify(form));
    // Auto login
    logIn(form.Email);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-body px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-form p-8 rounded-lg shadow"
      >
        {/* Heading */}
        <h2 className="text-3xl font-semibold mb-2 text-center pb-2.5 ">
          Create a free account
        </h2>

        <p className="text-center text-sm text-secondary pb-5">
          Gain access to more features with an Free-Invoice-Generator.com
          account.
        </p>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="Fname"
            required
            value={form.Fname}
            onChange={handleChange}
            placeholder="First name"
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="Lname"
            value={form.Lname}
            onChange={handleChange}
            placeholder="Last name"
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="Email"
            required
            value={form.Email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            name="Pass"
            required
            value={form.Pass}
            onChange={handleChange}
            placeholder="Password"
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <select
            name="Country"
            value={form.Country}
            onChange={handleChange}
            className="bg-form border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select country</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Pakistan</option>
            <option>India</option>
          </select>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mb-4">
          <input
            required
            type="checkbox"
            className="mt-1"
            name="Terms"
            checked={form.Terms || false}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, Terms: e.target.checked }))
            }
          />
          <p className="text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
          </p>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accentDark text-white py-2 rounded font-medium cursor-pointer"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
