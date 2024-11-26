import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['Admin','Author', 'Editor','Guest']
    },
    profilePicture:{
        type:String
    }
})

const User=mongoose.model('User', userSchema)

export default User;