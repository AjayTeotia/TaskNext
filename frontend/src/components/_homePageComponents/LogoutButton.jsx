import useLogout from "@/hooks/UseLogout";
import { LogOutIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const navigate = useNavigate();

  const toLandingPage = async () => {
    navigate("/");
    await logout();
  };

  return (
    <div>
      {!loading ? (
        <LogOutIcon className="cursor-pointer" onClick={toLandingPage} />
      ) : (
        <span className="loader animate-spin"></span>
      )}
    </div>
  );
};

export default LogoutButton;
