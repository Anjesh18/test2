import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SingleBlogCard({ blog }) {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  console.log(typeof blog.createdAt);
  const postDate = (date) => {    //function to trim the date fetched by mongoDB
    return date.split("T")[0];
  };
  return (
    <div className="max-w-5xl mx-auto overflow-x-hidden  gap-3 rounded-2xl shadow-2xl px-9 py-4 m-3">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold">{blog?.title}</h1>
        <p className="text-sm font-bold ">Posted by- {blog?.postedBy?.name} </p>
      </div>
      <div className="flex text-md my-7 px-6">
        {blog?.content.split("").slice(0, 800)}........
      </div>
      <div className="flex flex-row justify-between  items-center my-3">
        <Link to={`/description/${blog._id}`}>
          <Button className="">Read whole blog</Button>
        </Link>
        {user && user.role === "Editor" ? (
          <Button
            className="w-1/5 rounded-lg"
            onClick={() => navigate(`/blog/edit/${blog._id}`)}
            variant="outline"
          >
            Edit Blog
          </Button>
        ) : (
          <></>
        )}
        <p className="text-sm">Posted on: {postDate(blog.createdAt)} </p>
      </div>
    </div>
  );
}
