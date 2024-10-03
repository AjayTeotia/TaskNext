import React from "react";
import Logo from "../Logo";
import { ModeToggle } from "../ModeToggle";
import LogoutButton from "./LogoutButton";

const HomePageHeader = () => {
  return (
    <div className="flex justify-between items-center p-5 border-b-2 shadow-lg">
      <Logo />

      <div className="md:flex gap-4 items-center hidden">
        <ModeToggle />

        <LogoutButton />
      </div>
    </div>
  );
};

export default HomePageHeader;
