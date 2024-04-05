"use client";
import Link from "next/link";

import { Heart, Info, Mail, Music4Icon, Scale, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const emailRegex = /.*@.*\..*/;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Handle form submission logic here
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });
      if (res.status === 200) {
        setEmail("");
        setMessage("");
        setIsLoading(false);
        setIsSent(true);
      }
      // console.log(await res.json());
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };
  return (
    <footer className="bg-neutral-800/50 mt-1 p-4 flex flex-col">
      <div className="text-white flex flex-col md:flex-row gap-5 items-center justify-between xl:mx-20">
        <div className="links flex md:gap-10 w-full md:w-max justify-evenly md:justify-between items-start">
          <div className="user-page flex flex-col gap-2">
            <h3 className="text-xl text-center">Your Smuss</h3>
            <Link className="ml-4" href="/account">
              <User size={16} className="mr-2 inline-block" />
              Account
            </Link>
            <Link className="ml-4" href="/library">
              <Music4Icon size={16} className="mr-2 inline-block" />
              Library
            </Link>
            <Link className="ml-4" href="/favorites">
              <Heart size={16} className="mr-2 inline-block" />
              Favorites
            </Link>
          </div>
          <div className="useful-link flex flex-col gap-2 ">
            <h3 className="text-xl text-center">Useful Links</h3>
            <Link className="ml-4" href="/about">
              <Info size={16} className="mr-2 inline-block" />
              About
            </Link>
            <Link className="ml-4" href="/terms">
              <Scale size={16} className="mr-2 inline-block" />
              Legal
            </Link>
          </div>
        </div>
        <div className="contact flex flex-col justify-between items-center h-full gap-5 text-white w-full md:w-auto">
          {!isSent ? (
            <>
              <div className="flex flex-col xl:flex-row gap-5 w-full">
                <div className="relative ">
                  <input
                    type="text"
                    value={email}
                    className={`peer 
                    px-3 py-[0.35rem]
          rounded 
          bg-transparent 
          outline-none transition-all duration-200 ease-linear 
          focus:placeholder:opacity-100  
          data-[te-input-state-active]:placeholder:opacity-100 border-2 w-full  ${
            email !== "" ? "border-green-700" : " border-green-800/80"
          }`}
                    data-te-toggle="timepicker-just-input"
                    id="inputEmail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="inputEmail"
                    className={`absolute text-base md:text-xl left-3 top-0 mb-0 max-w-[90%] hover:cursor-text origin-[0_0] truncate pt-2 text-white transition-all duration-200 ease-out  ${
                      email !== ""
                        ? "-translate-y-[1.1rem] scale-[0.7] text-primary peer-data-[te-input-state-active]:-translate-y-[1.1rem] peer-data-[te-input-state-active]:scale-[0.8] bg-transparent"
                        : ""
                    }`}
                  >
                    {email !== "" ? "Email" : "Email"}
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={message}
                    className={`peer 
                    px-3 py-[0.35rem]
          rounded 
          bg-transparent 
          outline-none transition-all duration-200 ease-linear 
          focus:placeholder:opacity-100  
          data-[te-input-state-active]:placeholder:opacity-100 border-2 w-full  ${
            message !== "" ? "border-green-700" : " border-green-800/80"
          }`}
                    data-te-toggle="timepicker-just-input"
                    id="inputMessage"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <label
                    htmlFor="inputMessage"
                    className={`absolute text-base md:text-xl left-3 top-0 mb-0 max-w-[90%] hover:cursor-text origin-[0_0] truncate pt-2 text-white transition-all duration-200 ease-out  ${
                      message !== ""
                        ? "-translate-y-[1.1rem] scale-[0.7] text-primary peer-data-[te-input-state-active]:-translate-y-[1.1rem] peer-data-[te-input-state-active]:scale-[0.8] bg-transparent"
                        : ""
                    }`}
                  >
                    {message !== "" ? "Message" : "Message"}
                  </label>
                </div>
                <button
                  className=" min-w-28 p-5 md:p-2 rounded-full flex items-center justify-center bg-neutral-700/40 border border-green-700/50"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  <Mail size={16} className="mr-2 inline-block" />
                  {isLoading ? "Contacting..." : "Contact us"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-white flex flex-col text-center ">
              {" "}
              <h1 className=" md:text-xl lg:text-2xl font-bold text-green-400">
                Thank you for contact with us!!
              </h1>
              <p className="mt-4 text-base lg:text-xl ">
                We will get back to you as soon as possible
              </p>
            </div>
          )}
          <div className="copyright">
            <p className="text-white">
              &copy; {year} Smuss. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
