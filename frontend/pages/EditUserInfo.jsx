import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditUserInfo() {
    const [name, setName]=useState('')
    
    const [role,setRole]=useState('')

    const {id}=useParams()

    useEffect(()=>{
        const fetchUser=async()=>{
            const response=await axios.get(`http://localhost:8888/api/users/user/${id}`)
            if(response.data.success==true){
                setName(response.data.user.name)
                
                setRole(response.data.user.role)
            }
        }
        fetchUser()
    },[])

    const data={name,role}
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response=await axios.put(`http://localhost:8888/api/users/updateUser/${id}`, data, {withCredentials:true})
        if(response.data.success==true){
            console.log("success")
            navigate('/')
        }
    }

  return (
    <div>
      <div className="">
      <Navbar/>
      <div className="flex  justify-center mx-auto max-w-7xl mt-10">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 items-center border border-gray-400 rounded-lg shadow-xl p-5"
        >
          <h1 className="text-2xl flex justify-center font-bold my-3">Edit</h1>

          

          <div className="flex flex-col items-start px-2 gap-2 my-3">
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <Input
              type="name"
              
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col max-w-3xl items-start px-2 gap-2 my-3">
            <label htmlFor="role" className="text-lg">
              Role
            </label>
            <div className="flex flex-col gap-3 text-md">
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  value="Admin"
                  checked={role === "Admin"}
                  onChange={(e) => setRole( e.target.value)}
                />
                <label htmlFor="admin">Admin</label>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  value="Author"
                  checked={role === "Author"}
                  onChange={(e) => setRole( e.target.value)}
                />
                <label htmlFor="author">Author</label>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  value="Editor"
                  checked={role === "Editor"}
                  onChange={(e) => setRole( e.target.value)}
                />
                <label htmlFor="editor">Editor</label>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  value="Guest"
                  checked={role === "Guest"}
                  onChange={(e) => setRole( e.target.value)}
                />
                <label htmlFor="guest">Guest</label>
              </div>
            </div>
            </div>
          <Button
            type="submit"
            className="w-full bg-green-600 my-3 hover:bg-green-800 text-lg p-2"
          >
            Submit
          </Button>
          
        </form>
      </div>
    </div>
    </div>
  )
}
