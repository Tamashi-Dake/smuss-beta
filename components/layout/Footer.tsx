"use client";
import Link from "next/link";

import {
  Heart,
  Info,
  Linkedin,
  Mail,
  Music4Icon,
  Scale,
  User,
} from "lucide-react";
import { BsGithub } from "react-icons/bs";
const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800/50 mt-1 p-2 flex flex-col">
      <div className="text-white flex gap-5 items-start justify-between xl:mx-14">
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
            <Link className="ml-4" href="/about#contact">
              <Mail size={16} className="mr-2 inline-block" />
              Contact
            </Link>
            {/* <Link className="ml-4" href="/legal">
              <Scale size={16} className="mr-2 inline-block" />
              Legal
            </Link> */}
          </div>
        </div>
        {/* social links */}
        <div className="social flex flex-col md:flex-row gap-4 m-4">
          <Link
            href="https://github.com/Tamashi-Dake/smuss-beta"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-green-700/50 p-2 rounded-full flex gap-2 items-center justify-center w-fit-content group "
          >
            <BsGithub
              size={20}
              className="inline-block group-hover:scale-125 transition-all duration-200 ease-in-out"
            />
            <p className="block md:hidden">Github</p>
          </Link>
          <Link
            href="https://www.linkedin.com/in/tamashi-dake-abc123/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-green-700/50 p-2 rounded-full flex gap-2 items-center justify-center w-fit-content group "
          >
            <Linkedin
              size={20}
              className="inline-block group-hover:scale-125 transition-all duration-200 ease-in-out"
            />
            <p className="block md:hidden">LinkedIn</p>
          </Link>
        </div>
      </div>
      <div className="copyright mx-auto my-2">
        <p className="text-white">&copy; {year} Smuss. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
