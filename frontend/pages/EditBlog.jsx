
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(
        `http://localhost:8888/api/blogs/blog/${id}`
      );
      if (response.data.success == true) {
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
      }
    };
    fetchBlog();
  }, [id]);

  const data = { title, content };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:8888/api/blogs/updateBlog/${id}`,
      data,
      { withCredentials: true }
    );
    if (response.data.success == true) {
      navigate(`/description/${id}`);
    }
  };

  return (
    <div className="">
        <button
        className=" mt-5 w-[300px] px-8"
        onClick={() => navigate("/allBlogs")}
      >
        <ArrowLeftIcon />
      </button>
      <div className="flex flex-col max-w-3xl mx-auto gap-7">
        <h1
          className="flex justify-center text-3xl font-extrabold font-serif mt-5
         text-[#241242]"
        >
          Edit Blog
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            {" "}
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your title here"
              className="w-full border  border-gray-500 rounded-xl"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your content here..."
              className="pt-6 pb-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
             placeholder-gray-500 text-sm placeholder:text-start placeholder:pt-0 w-full min-h-[400px] 
              border border-gray-500"
            ></textarea>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 p-2 my-4  hover:bg-green-900"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
