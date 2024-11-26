import Navbar from "@/components/shared/Navbar";
import SingleBlogCard from "@/components/shared/SingleBlogCard";
import { setBlogs } from "@/redux/BlogSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AllBlogs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8888/api/blogs/getAllBlogs" //fecthing all the blogs from database using useEffect as soon the page mounts
      );
      if (response.data.success == true) {
        console.log(response.data.blogs);
        dispatch(setBlogs(response.data.blogs));    //putting the fetched data in the state made using redux
      }
    };
    fetchData();
  }, []);
  const { blogs } = useSelector((store) => store.blog);

  return (
    <div>
      <Navbar />
      <div className=" max-w-7xl  mx-auto my-6">
        {blogs.map((blog) => (
          <SingleBlogCard key={blog?._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
