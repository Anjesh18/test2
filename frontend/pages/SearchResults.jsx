import SingleBlogCard from "@/components/shared/SingleBlogCard";
import { setSearchedQuery } from "@/redux/BlogSlice";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchResults() {
  const { searchedQuery } = useSelector((store) => store.blog);
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get(
        `http://localhost:8888/api/blogs/get?q=${searchedQuery}`
      );
      if (response.data.success == true) {
        console.log(response.data.results);
        setSearchedBlogs(response.data.results);
      }
    };
    fetchResults();
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <button className=" mt-5 w-[300px] px-8" onClick={() => navigate("/")}>
        <ArrowLeftIcon />
      </button>
      {searchedBlogs.map((blog) => (
        <div className="my-11">
          <SingleBlogCard key={blog._id} blog={blog} />
        </div>
      ))}
    </div>
  );
}
