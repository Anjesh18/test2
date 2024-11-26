# Blog App using MERN Stack

 Welcome to the blog app repository! This application is built using the MERN (MongoDB, Express, React, Node.js) stack and comes with various functionalitites like posting, editing and deleting blogs.

## Features
 - The core feature of this app revolves around its feature to provide access to users based on their roles.


 - There are 4 types of roles available in the app namely "Author", "Admin", "Editor" and "Guest".
 There are different set of components and pages for admin as he is allowed to manage all the users of the app.

 - The blogs can only be deleted by the authors who posted them.

 - Editors can edit any blog as per their needs, wishes or requirements.

-  The admin can perform operations like delete users and edit their details as well.

## Screenshots

![alt text](image-1.png)

 This is the home page when there is no user logged in.




![alt text](image-7.png)
 Create blog page for the authors.

![alt text](image-8.png)
 The 'Blogs' page.

![alt text](image-9.png)
 The admin home page.

## Getting started

To get started with this project, follow these steps:
1. Fork this repository.
2. Clone this repository to your local machine.
3. Install the required dependencies for both frontend and backend:
```javascript
mkdir frontend 
mkdir backend
```
4. Go the backend folder run:
```javascript
cd backend
npm init -y
```
5. Then install the dependencies and after that run:
```javascript
npm run dev
```
6. Now go the frontend folder and install vite:
```javascript
cd ..
cd frontend
npm create vite@latest .
```
7. Select 'React' and 'javascript' and then run:
```javascript
npm install
```
8. Install all the dependencies like react-router-dom, axios etc.
9. Now install Tailwind.css:
```javascript
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
10. After this install shadcn ui:
```javascript
npx shadcn@latest init
npx shadcn@latest add input
npx shadcn@latest add button
npx shadcn@latest add avatar
npx shadcn@latest add popover
npx shadcn@latest add sonner
```
11. Install reduxjs ttolkit and react-redux:
```javascript
npm install @reduxjs/toolkit
npm install react-redux
```
12. Now start the server by:
```javascript
npm run dev
```