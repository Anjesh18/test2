import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PostBlog() {
  const { user } = useSelector((store) => store.auth);
  const [data, setData] = useState({
    title: "",
    content: "",
  });
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response=await axios.post('http://localhost:8888/api/blogs/newBlog', data, {withCredentials: true})
        if(response.data.success==true){
            toast.success(response.data.message)
            navigate('/allBlogs')
        }
    }

  return (
    <div className="">
      <Navbar />
      {!user ? (
        <div className="flex items-center">
          <div className=" font-thin text-3xl mx-auto my-11 p-11 self-center">
            Login to post new blog!!
            <Link to="/login">
              <span className="text-blue-800 p-4 underline ">Login</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col max-w-3xl mx-auto gap-7">
          <h1
            className="flex justify-center text-3xl font-extrabold font-serif mt-5
           text-[#241242]"
          >
            Create Blog
          </h1>
          <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            {" "}
            <Input
            type='text'
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Enter your title here"
              className="w-full border  border-gray-500 rounded-xl"
            />
            <textarea
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              placeholder="Type your content here..."
              className="pt-6 pb-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
               placeholder-gray-500 text-sm placeholder:text-start placeholder:pt-0 w-full min-h-[400px] 
                border border-gray-500"
            ></textarea>
          </div>
          <Button type='submit' className='w-full bg-green-600 p-2 my-4  hover:bg-green-900'>Submit</Button>
          </form>
        </div>
      )}
    </div>
  );
}
