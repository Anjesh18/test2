import AdminHomePage from "@/pages/AdminHomePage";
import BlogCards from "@/components/shared/BlogCards";
import HeroSection from "@/components/shared/HeroSection";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { useSelector } from "react-redux";
import AuthorBlogs from "@/components/shared/AuthorBlogs";

export default function Home() {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      {user && user.role === "Admin" ? (
        <>
          <div>
            {" "}
            {/*Different page for users with admin role */}
            <AdminHomePage />
          </div>
        </>
      ) : (
        <>
          <div>
            <Navbar />
            <HeroSection />
            {user && user.role === "Author" ? (
              <>
                {/* different home component for users with author role. They could be able to view their own posted blogs on the home page*/}
                <AuthorBlogs />
              </>
            ) : (
              <>
                <BlogCards />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
