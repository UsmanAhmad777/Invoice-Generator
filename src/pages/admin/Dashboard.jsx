import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import avatar from "../../assets/boy.png";
function Dashboard() {
  const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

  // const [image, setImage] = useState(savedUser?.profile || avatar);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     const updateUser = { ...savedUser, profile: reader.result }; // save image here

  //     localStorage.setItem("registeredUser", JSON.stringify(updateUser));
  //     setImage(reader.result);
  //   };

  //   reader.readAsDataURL(file);
  // };

  return (
    <div className="text-center h-screen pt-24">
      {/* <label className="cursor-pointer">
        <img
          src={image}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      <p className="text-sm text-gray-500 mt-2">Click image to change</p> */}
      <h2 className="text-2xl font-semibold">
        Welcome to Dashboard {savedUser.Fname} {savedUser.Lname}
      </h2>
    </div>
  );
}

export default Dashboard;
