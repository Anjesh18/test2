import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function AdminTable() {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8888/api/users/allUsers" //fecthing users in useEffect to get data as soon as the page mounts
      );
      if (response.data.success == true) {
        setFetchedUsers(response.data.allUsers);
        console.log(response.data.allUsers);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto my-10">
      <table className="w-full border-separate border-spacing-1">
        <tr>
          <th className="border border-slate-600 rounded-md">No.</th>
          <th className="border border-slate-600 rounded-md">Name</th>
          <th className="border border-slate-600 rounded-md">Username</th>
          <th className="border border-slate-600 rounded-md">Role</th>
          <th className="border border-slate-600 rounded-md">Actions</th>
        </tr>

        {fetchedUsers.map((users, idx) => (
          <tr key={users._id} className="h-8">
            <td className="border border-slate-900 rounded-md text-center">
              {idx + 1}
            </td>
            <td className="border border-slate-900 rounded-md text-center">
              {users?.name}
            </td>
            <td className="border border-slate-900 rounded-md text-center">
              {users?.username}
            </td>
            <td className="border border-slate-900 rounded-md text-center">
              {users?.role}
            </td>
            <td className="border border-slate-900 rounded-md text-center">
              {users.role === "Admin" ? (
                <>NA</>
              ) : (
                <div className="flex flex-row space-3 justify-center  items-center ">
                  <button
                    onClick={() => navigate(`/editUser/${users._id}`)}
                    className="mx-auto text-green-700"
                  >
                    <Edit2 />
                  </button>{" "}
                  <button
                    onClick={() => navigate(`/deleteUser/${users._id}`)}
                    className="mx-auto text-red-600"
                  >
                    <Trash2 />
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
