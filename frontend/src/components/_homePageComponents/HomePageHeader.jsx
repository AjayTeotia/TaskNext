import React from "react";
import Logo from "../Logo";
import { ModeToggle } from "../ModeToggle";
import LogoutButton from "./LogoutButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

const HomePageHeader = () => {
  return (
    <div className="flex justify-between items-center p-5 border-b-2 shadow-lg">
      <Logo />

      <div className="md:flex gap-4 items-center hidden">
        <ModeToggle />

        <LogoutButton />
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
              <SheetTitle className="mb-5 mt-5  border-b-2 w-full">
                <Logo />
              </SheetTitle>
              <SheetDescription>
                <div className="gap-4 items-center flex flex-col">
                  <ModeToggle />

                  <LogoutButton />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default HomePageHeader;
