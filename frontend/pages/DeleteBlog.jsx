import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function DeleteBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:8888/api/blogs/deleteBlog/${id}`
    );
    if (response.data.success == true) {
      toast.success(response.data.message);
      navigate("/");
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto my-[200px] rounded-2xl justify-center p-6 items-center border border-gray-600">
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold gap-3 text-[#6753c4] my-3">
          {" "}
          Do you really want to delete thi user? They would not be able to login
          in the future!
          <p className="p-3"> </p>
        </h1>
        <div className="max-w-4xl my-5 flex flex-row justify-between">
          <Button
            className="w-[40%] bg-red-800 hover:bg-red-700"
            onClick={() => handleDelete()}
          >
            Yes
          </Button>
          <Button
            className="w-[40%] bg-green-800 hover:bg-green-700"
            onClick={() => navigate("/")}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
