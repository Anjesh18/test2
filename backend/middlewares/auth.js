import jwt from 'jsonwebtoken'

export const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token //fetching token from the cookies
        if(!token){
            return res.status(404).json({message:"Token not found", success:false})//verifying if the token is available
        }
        const decode=jwt.verify(token, process.env.JWT_SECRET) //verifying the token using jwt secret
        if(!decode){
            return res.status(405).json({message:"Invalid token", success:false})
        }
        req.id=decode.userId //assigning req.id the value of the loggedin user's id
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(406).json({message:"Internal server error", success:false})
    }
}