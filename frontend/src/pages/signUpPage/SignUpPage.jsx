import AuthHeader from "@/components/AuthHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSignUp from "@/hooks/UseSignUp";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, loading } = useSignUp();

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const toLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Inputs before signup:", inputs);
    await signup(inputs);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <AuthHeader />

      <div className="flex items-center justify-center flex-1 p-5">
        <div className="max-w-md w-full bg-primary-foreground rounded-xl shadow-md ">
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#005C97] to-[#363795] bg-clip-text text-transparent">
              Create an account
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Ajay Teotia"
                    value={inputs.fullName}
                    onChange={(e) =>
                      setInputs({ ...inputs, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="">Username</Label>
                  <Input
                    type="text"
                    placeholder="ajayteotia"
                    value={inputs.username}
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="">Password</Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs({ ...inputs, password: e.target.value })
                    }
                  />
                </div>

                <Button className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="loader animate-spin  w-4 h-4"></span>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="text-sm md:text-lg px-8 py-4 bg-secondary flex justify-center rounded-xl">
            <p>
              Already have an account?
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={toLogin}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
