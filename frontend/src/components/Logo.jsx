import { NotebookTextIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center gap-1 cursor-pointer" onClick={toHome}>
      <NotebookTextIcon className="w-12 h-12 stroke-[2] stroke-[#005C97]" />

      <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005C97] to-[#363795] tracking-tight leading-tight">
        TaskNext
      </p>
    </div>
  );
};

export default Logo;
