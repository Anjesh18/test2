import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    role: "",
    file: null,
  });

  const formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("username", data.username);
  formdata.append("password", data.password);
  formdata.append("role", data.role);
  if (data?.file) {
    formdata.append("file", data.file);
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const response = await axios.post(
      "http://localhost:8888/api/users/register",
      formdata,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    if (response.data.success == true) {
      toast.success(response.data.message);
      navigate("/login");
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex  justify-center mx-auto max-w-7xl mt-10">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 items-center border border-gray-400 rounded-lg shadow-xl p-5"
        >
          <h1 className="text-2xl flex justify-center font-bold my-3">
            Register
          </h1>
          <div className="flex flex-col items-start px-2 gap-2 my-3">
            <label htmlFor="name" className="text-lg">
              Full name
            </label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col items-start px-2 gap-2 my-3">
            <label htmlFor="username" className="text-lg">
              Username
            </label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col items-start px-2 gap-2 my-3">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <Input
              type="password"
              placeholder="Create a password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <div className="flex flex-col max-w-3xl items-start px-2 gap-2 my-3">
            <label htmlFor="role" className="text-lg">
              Role
            </label>
            <div className="flex flex-col gap-3 text-md">
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  value="Admin"
                  checked={data.role === "Admin"}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                />
                <label htmlFor="admin">Admin</label>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  value="Author"
                  checked={data.role === "Author"}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                />
                <label htmlFor="author">Author</label>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  value="Editor"
                  checked={data.role === "Editor"}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                />
                <label htmlFor="editor">Editor</label>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  value="Guest"
                  checked={data.role === "Guest"}
                  onChange={(e) => setData({ ...data, role: e.target.value })}
                />
                <label htmlFor="guest">Guest</label>
              </div>
            </div>
            <div className="flex flex-col items-start px-2 gap-2 my-3">
              <label htmlFor="picture" className="text-lg">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setData({ ...data, file: e.target.files?.[0] })
                }
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 my-3 hover:bg-green-800 text-lg p-2"
          >
            Submit
          </Button>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-600">Login </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
