import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import HomeBlogCards from "./HomeBlogCards";
import axios from "axios";
import { setBlogs } from "@/redux/BlogSlice";

export default function BlogCards() {
  const { blogs } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        "http://localhost:8888/api/blogs/getAllBlogs"
      );
      if (response.data.success == true) {
        dispatch(setBlogs(response.data.blogs));
      }
    };
    fetchBlogs();
  }, []);
  console.log(blogs);
  return (
    <div className="flex flex-col gap-11 max-w-7xl mx-auto">
      <h1 className="text-2xl font-extrabold underline">Latest blogs:</h1>
      <div className="max-w-7xl grid grid-cols-2">
        {blogs.length < 1 ? (
          <>No blogs to show at the moment!!</>
        ) : (
          <>
            {blogs.slice(0, 6).map((blog) => {
              return <HomeBlogCards blog={blog} key={blog._id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}
