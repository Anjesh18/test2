import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/BlogSlice";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    dispatch(setSearchedQuery(query));
    navigate("/searchResults");
  };
  return (
    <div className="flex flex-col items-center justify-center my-16">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl  text-[#6848c2]">Scroll, browse and read</h1>
        <div className="my-6 text-red-600 text-4xl">
          blogs and stories as per your interests.
        </div>
      </div>
      <div className="flex w-[40%] gap-3 border border-gray-200 shadow-lg rounded-full items-center mx-auto my-10">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for keywords or blogs"
          className="p-4 rounded-full outline-none border-none w-full"
        />
        <Button
          onClick={handleSearch}
          className="rounded-r-full bg-[#4f3574] px-4"
        >
          <Search className="h-6 w-full " />
        </Button>
      </div>
    </div>
  );
}
