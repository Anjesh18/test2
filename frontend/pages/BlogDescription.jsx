import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function BlogDescription() {
  const { user } = useSelector((store) => store.auth);
  const [fetchedData, setFetchedData] = useState({});
  const [fetchedUser, setFetchedUser] = useState({});
  const [createDate, setCreateDate] = useState("");
  const { id } = useParams();      //takes or catches ID from parameters
  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(
        `http://localhost:8888/api/blogs/blog/${id}`        //fetching the particular blog details from database
      );
      if (response.data.success == true) {
        setFetchedData(response.data.blog);
        setFetchedUser(response.data.blog.postedBy); //storing users' data in a separate state
        setCreateDate(response.data.blog.createdAt);
      }
    };
    fetchBlog();
  }, [id]);

  const postedDate = (createDate) => {
    //function to trim dates fetched by mongoDB
    return createDate.split("T")[0];
  };
  const navigate = useNavigate();
  return (
    <div>
      <button
        className=" mt-5 w-[300px] px-8"
        onClick={() => navigate("/allBlogs")}
      >
        <ArrowLeftIcon />
      </button>
      {!user ? (
        <div className="flex justify-center items-center text-4xl mt-[200px] font-serif">
          Login to read the whole blog!!!{" "}
          <Link to="/login" className="text-blue-500 underline">
            {" "}
            <span> Login</span>
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl flex flex-col mx-auto  my-11">
          <div className="flex flex-row justify-between items-center ">
            <p className="text-2xl flex font-bold">{fetchedData.title}</p>
            <span className="font-semibold">Author: {fetchedUser?.name}</span>
          </div>
          <p className="my-8 px-3">{fetchedData.content}</p>
          <span className="flex justify-end text-lg px-8">
            Posted on: {postedDate(createDate)}
          </span>
          {fetchedUser.name === user.name ? (
            <Button
              onClick={() => navigate(`/blog/delete/${fetchedData._id}`)}
              className="w-full mt-6  mb-3 bg-red-500 hover:bg-red-700"
            >{/* This button would only be visible for user who has created the blog*/}
              Delete
            </Button>
          ) : (
            <></>
          )}
          {user.role === "Editor" ? (
            <Button   
              onClick={() => navigate(`/blog/edit/${fetchedData._id}`)}
              className="w-full mt-6 bg-green-600 hover:bg-green-800"
            >{/* This button would only be visible for users whose roles are "Editor"*/}
              Edit
            </Button>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
