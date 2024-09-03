import { z } from "zod"
import { signUpSchema, signInSchema } from "../schemas/user.schema.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Patient } from "../models/patients.model.js"
import bcrpyt from "bcrypt"
import jwt from "jsonwebtoken"
import { MedicineLog } from "../models/medicineLogs.model.js"

const signUpUser = async (req,res) => {
    try{
    const {success,error,data} = signUpSchema.safeParse(req.body);
    console.log(req.body)

    if (!success) {
        console.log("hellllooo")
        return res.json(
            new ApiResponse(error.errors[0].message ? error.errors[0].message : "Please Enter Valid Inputs",null,false,400)
        ).status(400);
    }

    const {firstName,lastName,email,password,gender,DOB,majorDisease} = data;

    const patient = await Patient.findOne({ email });

    if (patient) {
        return res.json(
            new ApiResponse("Patient With Similar Email Already Exists",null,false,400)         
        ).status(400);
    }

    const hashedPassword = await bcrpyt.hash(password, 10);

    const createdPatient = await Patient.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        gender,
        DOB,
        majorDisease
    })

    const patientId = createdPatient._id;
    const patientEmail = createdPatient.email;
    
    const patientToSend = await Patient.findById(createdPatient._id).select("-password");

    const token = jwt.sign({ patientId : createdPatient._id, patientEmail: createdPatient.email }, process.env.JWT_SECRET);

    return res.json(
        new ApiResponse("Patient Created Successfully",{patientToSend,token},true,200)
    ).status(200);

} catch (error) {
    console.log("something went wrong while signing up the user", error);
    return res.json(
        new ApiResponse("something went wrong while signing up the user",null,false,500)
    ).status(500);
}
}

const signInUser = async (req,res) => {
    try {
        const signInBody = req.body;
        const { success,error } = signInSchema.safeParse(signInBody);

        if (!success) {
            return res.json(
                new ApiResponse(error.errors[0].message ? error.errors[0].message : "Please Enter Valid Inputs",null,false,400)
            ).status(400);
        }

        const patient = await Patient.findOne({ email: signInBody.email });

        if (!patient) {
            return res.json(
                new ApiResponse("No User Found with provided email",null,false,400)         
            ).status(400);
        }

        const { password } = patient;

        const isPasswordCorrect = await bcrpyt.compare(signInBody.password, password)

        if (!isPasswordCorrect) {
            return res.json(
                new ApiResponse("Entered password is incorrect",null,false,400)         
            ).status(400);
        }

        const patientToSend = await Patient.findById(patient._id).select("-password");

        const token = jwt.sign({ patientId: patient._id }, process.env.JWT_SECRET);

        return res.json(
            new ApiResponse("Patient Logged In Successfully",{patientToSend,token},true,200)
        ).status(200);

    } catch (error) {
        console.log("something went wrong while signing in the user", error);
        return res.json(
            new ApiResponse("something went wrong while signing in the user",null,false,500)
        ).status(500);
    }
}

const getAllUsersMed = async (req,res) => {
    try {
        const id = req.patientInfo.patientId;
        const user = await Patient.findById(id);

        if(!user){
            return res.json(
                new ApiResponse("No User Found with provided email",null,false,400)         
            ).status(400); 
        }

        const medicineLogs = await MedicineLog.find({patientId:id});

        if(medicineLogs.length==0){
            return res.json(
                new ApiResponse("No Logs Found. Add Now",null,false,400)         
            ).status(404);  
        }

        return res.json(
            new ApiResponse("Logs Fetched Successfully",{medicineLogs},true,200)
        ).status(200);

    } catch (error) {
        console.log("something went wrong while getting medicine log of the user", error);
        return res.json(
            new ApiResponse("something went wrong while getting medicine log of the user",null,false,500)
        ).status(500);
    }
}


export {
    signUpUser,
    signInUser, 
    getAllUsersMed
}
