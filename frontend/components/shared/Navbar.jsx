import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:8888/api/users/logout",
      { withCredentials: true }
    );
    if (response.data.success == true) {
      navigate("/");
      dispatch(setUser(null));
    }
  };

  return (
    <div className="flex flex-row  bg-gray-50 max-w-7xl mx-auto rounded-2xl items-center justify-between px-6 py-4">
      <h1 className="text-4xl italic font-extrabold text-[#d83131]">
        Blog<span className="text-[#190720]">gery</span>
      </h1>

      {user && user.role === "Author" ? (
        <ul className="flex flex-row gap-5 p-4 items-center">
          <Link to="/">
            {" "}
            <li className="text-xl font-semibold mx-11 px-11">Home</li>{" "}
            {/* the "Post" option shall only be visible if the user's role is 'Author' */}
          </Link>
          <Link to="/allBlogs">
            <li className="text-xl font-semibold mx-11 px-11">Blogs</li>
          </Link>
          <Link to="/newBlog">
            <li className="text-xl font-semibold mx-11 px-11">Post</li>
          </Link>
        </ul>
      ) : (
        <ul className="flex flex-row gap-5 p-4 items-center">
          <Link to="/">
            {" "}
            <li className="text-xl font-semibold mx-11 px-11">Home</li>
          </Link>
          <Link to="/allBlogs">
            <li className="text-xl font-semibold mx-11 px-11">Blogs</li>
          </Link>
        </ul>
      )}

      {user ? (
        <div>
          <Popover>
            {" "}
            {/* Popover component would only be visible to the users when they are logged in*/}
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="@shadcn" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-50 items-center ">
              <ul className="flex flex-col gap-4">
                <li className="flex flex-row gap-3 text-lg">
                  <User2 />
                  {user.name}
                </li>
                <li className="flex flex-row gap-3 text-lg">
                  <LogOut />
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex flex-row-reverse gap-5 px-9">
          <Link to="/login">
            {" "}
            {/*If not logged in, the users would see the options to logina and register*/}{" "}
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="mx-11  bg-[#24144b]">Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
