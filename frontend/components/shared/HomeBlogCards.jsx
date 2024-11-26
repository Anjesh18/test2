import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomeBlogCards({ blog }) {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col shadow-2xl rounded-2xl max-w-4xl mb-9 mx-5 px-6 py-4">
      <>
        {user && user.role === "Author" ? (
          <div className="flex mx-auto">
            <h1 className="flex justify-center text-xl font-bold">
              {blog.title}
            </h1>
          </div>
        ) : (
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-bold">{blog.title}</h1>
            <p className="text-md font-semibold">
              posted by- {blog.postedBy.name}
            </p>
          </div>
        )}
      </>
      <p className="py-4 px-6">{blog.content.split("").slice(0, 300)}......</p>

      {user && user.role === "Author" ? (
        <div div className="flex flex-row justify-between gap-5 my-4">
          <Button className="w-1/2 mx-auto ">
            <Link to={`/description/${blog._id}`}>Read blog</Link>
          </Button>

          <Button
            onClick={() => navigate(`blog/delete/${blog._id}`)}
            className="w-1/2 bg-red-500 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      ) : (
        <>
          <Link to={`/description/${blog._id}`}>
            <Button className="w-full mx-auto px-4 mb-3">
              Read whole blog
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
