import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomeBlogCards from "./HomeBlogCards";

export default function AuthorBlogs() {
  const { user } = useSelector((store) => store.auth);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        "http://localhost:8888/api/blogs/allBlogs/user",
        { withCredentials: true }
      );
      if (response.data.success == true) {
        setBlogs(response.data.blogs);
      }
    };
    fetchBlogs();
  }, [user, user?._id]);
  return (
    <div>
      <div className="flex flex-col gap-11 max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold underline">
          Blogs posted by you are:
        </h1>
        <div className="max-w-7xl grid grid-cols-2">
          {blogs.length < 1 ? (
            <>No blogs to show at the moment!! </>
          ) : (
            <>
              {blogs.map((blog) => {
                return <HomeBlogCards blog={blog} key={blog._id} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
