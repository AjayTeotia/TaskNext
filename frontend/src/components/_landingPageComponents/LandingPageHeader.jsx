import React from "react";
import Logo from "../Logo";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPageHeader = () => {
  const navigate = useNavigate();

  const toSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="flex justify-between items-center p-5 border-b-2">
      <Logo />

      <div className="md:flex gap-4 items-center hidden ">
        <Button onClick={toSignUp} variant="secondary">
          Get Started
        </Button>

        <ModeToggle />
      </div>

      <div className="md:hidden block">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[250px] sm:w-[400px]" side={"left"}>
            <SheetHeader>
              <SheetTitle className="mb-5 mt-5">
                <Logo />
              </SheetTitle>
              <SheetDescription>
                <div className="gap-4 items-center flex flex-col">
                  <Button onClick={toSignUp} variant="secondary">
                    Get Started
                  </Button>

                  <ModeToggle />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default LandingPageHeader;
