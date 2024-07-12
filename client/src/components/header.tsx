import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { Connect } from "./ConnectButton";

export function Header() {
  return (
    <header className="container">
      <div className="flex h-14 w-full shrink-0 items-center px-6 my-2 mx-auto">
        {/* <Link className="hidden md:flex mr-6" to="/home">
        <FlagIcon className="h-6 w-6" />
        <h1 className="sr-only text-black">Collab inc</h1>
      </Link> */}
        <Link className="flex" to="/">
          <h1 className="text-xl font-medium tracking-tighter sm:text-2xl xl:text-2xl/none pt-1">
            Collab inc
          </h1>
        </Link>
        <nav className="flex flex-1 justify-center pt-1">
          <Link
            className="mx-2 text-md sm:text-md xl:text-md/none sm:mx-4 md:mx-6 lg:mx-4 xl:mx-8"
            to="/"
          >
            Home
          </Link>
          <Link
            className="mx-2 text-md sm:text-md xl:text-md/none sm:mx-4 md:mx-6 lg:mx-4 xl:mx-8"
            to="/market"
          >
            Creative Space
          </Link>
          <a
            className="mx-2 text-mdsm:text-md xl:text-md/none sm:mx-4 md:mx-6 lg:mx-4 xl:mx-8"
            href="https://github.com/Nairod36/DIT-C"
          >
            About
          </a>
        </nav>
        <div className="ml-auto flex items-center">
          {/* <Connect /> */}
        </div>
      </div>
    </header>
  );
}
