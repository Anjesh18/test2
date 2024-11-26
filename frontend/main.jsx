import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import store from './redux/store'
import AllBlogs from './pages/AllBlogs'
import PostBlog from './pages/PostBlog'
import BlogDescription from './pages/BlogDescription'
import EditUserInfo from './pages/EditUserInfo'
import ConfirmDeleteUser from './pages/ConfirmDeleteUser'
import EditBlog from './pages/EditBlog'
import DeleteBlog from './pages/DeleteBlog'
import SearchResults from './pages/SearchResults'


const router=createBrowserRouter([{
  path:'/',
  element:<Home/>
},
{
  path:"/login",
  element:<Login/>
},{
  path:'/register',
  element:<Register/>
},{
  path:"/allBlogs",
  element:<AllBlogs/>
},{
  path:'/newBlog',
  element:<PostBlog/>
},{
  path:'/description/:id',
  element:<BlogDescription/>
},{
  path:'/editUser/:id',
  element:<EditUserInfo/>
},{
  path:'/deleteUser/:id',
  element:<ConfirmDeleteUser/>
},{
  path:'/blog/edit/:id',
  element:<EditBlog/>
},{
  path:'/blog/delete/:id',
  element:<DeleteBlog/>
},{
  path:'/searchResults',
  element:<SearchResults/>
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    <Toaster/>
    </Provider>
   

  </StrictMode>,
)
