import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/authContext";
import dashboardImg from "../../assets/dashboard.png";

const LandingPageHero = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const toSignUp = () => {
    navigate("/signup");
  };

  const toHome = () => {
    navigate("/home");
  };

  return (
    <div className="  w-full flex flex-col items-center justify-center h-screen mt-20">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#005C97] to-[#363795] bg-clip-text text-transparent leading-tight tracking-tight">
            "TaskNext"
          </span>
        </h2>

        <p className="text-lg sm:text-xl mt-5 p-3 text-muted-foreground">
          One tool for doing it all, together
          <br />
          Backlog is the issue management tool for creators
        </p>

        {authUser ? (
          <Button onClick={toHome} variant="secondary" className="mt-5 p-5">
            Dashboard
          </Button>
        ) : (
          <Button onClick={toSignUp} variant="secondary" className="mt-5 p-5">
            Get Started, it's free
          </Button>
        )}

        <img
          className="mt-9 rounded-xl border-8 mb-16"
          src={dashboardImg}
          alt="Dashboard"
          width={1000}
          height={700}
        />
      </div>
    </div>
  );
};

export default LandingPageHero;
