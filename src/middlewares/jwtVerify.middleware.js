import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";


function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;

    if(!(authHeader && authHeader.startsWith("Bearer "))){
        return res.json(
            new ApiResponse("Token Not received",null,false,400)         
        ).status(403);
    }
    
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.patientInfo = decodedToken;
        next();
    } catch (error) {  
        return res.json(
            new ApiResponse("Invalid Token",null,false,400)         
        ).status(403);
    }
}

export {
    authMiddleware
}