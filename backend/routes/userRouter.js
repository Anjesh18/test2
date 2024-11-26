import express from 'express'
import { deleteUserByIdController, getAllUsersController, getUserByIdController, loginController, logoutController, registerController, updateUserByIdController } from '../controller/userController.js'
import { singleUpload } from '../middlewares/multer.js'


const router=express.Router()

router.post('/register',singleUpload, registerController)

router.post('/login', loginController)

router.post('/logout', logoutController)

router.get('/allUsers', getAllUsersController)

router.get('/user/:id', getUserByIdController)

router.put('/updateUser/:id', updateUserByIdController)

router.delete('/deleteUser/:id', deleteUserByIdController)

export default router;