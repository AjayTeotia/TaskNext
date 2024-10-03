import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

const AuthHeader = () => {
  return (
    <div className="flex justify-between items-center p-5 border-b-2 shadow-lg">
      <Logo />

      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default AuthHeader;
