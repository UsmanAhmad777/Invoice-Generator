import React from "react";
import Hero from "../../assets/herobanner.svg";
import Invoice from "../../components/Invoice";
import { ArrowBigDown, FileText } from "lucide-react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="">
      <div className="hero container flex justify-between items-center md:gap-20 flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-10 p-2.5 items-center md:items-start">
          <h1 className="text-6xl font-bold text-center md:text-left pt-10 ">
            <span className="text-accent">Create invoices</span> that make you
            look good
          </h1>
          <p className="text-center md:text-left">
            Create professional yet personalized invoices online using Free
            Invoice Generator. Just add all the information to the invoice and
            download or print it to send it to your customers.
          </p>
          <Link to={"/invoice"}>
            <button className=" flex  gap-5 px-5 py-3 cursor-pointer rounded-sm text-white bg-accent hover:bg-accentDark">
              Generate Invoice Now
              <FileText className="w-5 h-5" />
            </button>
          </Link>
        </div>
        <img src={Hero} alt="Hero banner" className="md:w-1/2 w-4/5" />
      </div>
    </div>
  );
}

export default Home;
