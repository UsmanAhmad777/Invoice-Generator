import React from "react";
import notFound from "../../assets/404-error.gif";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div className=" bg-white flex items-center flex-row justify-center h-screen">
      <img className="w-82 " src={notFound} alt="Page Not Found" />
    </div>
  );
}

export default PageNotFound;
