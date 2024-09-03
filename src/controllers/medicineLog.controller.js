import { MedicineLog } from "../models/medicineLogs.model.js";
import { medicineLogSchema, updateMedicineLogSchema } from "../schemas/medicine.schema.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addMedicine = async (req,res) => {
    try {
        console.log("bodyyyy",req.body)
        const {success,error,data} = medicineLogSchema.safeParse(req.body);
    
        if (!success) {
            return res.json(
                new ApiResponse("Please Enter Valid Inputs",null,false,400)
            ).status(400);
        }
    
        const {name,time,interval,dose,days,message} = data;
        const patientInfo = req.patientInfo;
    
        const doesMedExist = await MedicineLog.findOne({name});
    
        if(doesMedExist){
            return res.json(
                new ApiResponse("Medicine with the same name already exists",null,false,400)
            ).status(400);  
        }
    
        if(!req?.file?.path){
            return res.json(
                new ApiResponse("Medicine image is mandatory",null,false,400)
            ).status(400);   
        }
    
        const imgURL = await uploadOnCloudinary(req.file.path);
        if(!imgURL){
            return res.json(
                new ApiResponse("Couldn't upload image. Please try again.",null,false,500)
            ).status(500);
        }
    
        const medicineLog = await MedicineLog.create({
            name,
            time,
            interval,
            dose,
            days,
            message,
            patientId:patientInfo.patientId,
            image:imgURL
        })
    
        return res.json(
            new ApiResponse("Medicine Info Added Successfully",{medicineLog},true,200)
        ).status(200);

    } catch (error) {

        console.log("something went wrong while adding the medicine", error);
        return res.json(
            new ApiResponse("something went wrong while adding the medicine",null,false,500)
        ).status(500);   
    }

} 

const updateMed = async (req,res) => {
    try {
        const {id} = req.params;
        const {success,error,data} = updateMedicineLogSchema.safeParse(req.body);
    
        if (!success) {
            return res.json(
                new ApiResponse("Please Enter Valid Inputs",null,false,400)
            ).status(400);
        }
    
        const {name,time,interval,dose,days,message} = data;
        
        const medicineLog = await MedicineLog.findById(id);
        if(!medicineLog){
            return res.json(
                new ApiResponse("Medicine Log Not Found With The Provided Id.",null,false,404)
            ).status(404); 
        }
    
    
        const updatedMedLog = await MedicineLog.findByIdAndUpdate(
            id, 
            {
              $set: {
                name,
                time,
                interval,
                dose,
                days,
                message,
              } 
            }, 
            { new: true }
          );
    
        return res.json(
            new ApiResponse("Medicine Info Updated Successfully",{updatedMedLog},true,200)
        ).status(200);
    } catch (error) {
        console.log(error)
        return res.json(
            new ApiResponse("something went wrong while updating the medicine log",null,false,500)
        ).status(500);  
    }

}


const deleteMed = async (req,res) => {
    try {
        const {id} = req.params;

        const medicineLog = await MedicineLog.findById(id);

        if(!medicineLog){
            return res.json(
                new ApiResponse("Medicine Log Not Found With The Provided Id.",null,false,404)
            ).status(404); 
        }
    
        const updatedMedLog = await MedicineLog.findByIdAndDelete(id);
    
        return res.json(
            new ApiResponse("Medicine Info Deleted Successfully",{updatedMedLog},true,200)
        ).status(200);

    } catch (error) {
        console.log(error)
        return res.json(
            new ApiResponse("something went wrong while deleting the medicine log",null,false,500)
        ).status(500);  
    }
}
























const signUpUser = async (req,res) => {
    try{
    const {success,error,data} = signUpSchema.safeParse(req.body);

    if (!success) {
        return res.json(
            new ApiResponse(error.errors[0].message ? "All Fields" + " " + error.errors[0].message : "Please Enter Valid Inputs",null,false,400)
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


export {
    addMedicine,
    updateMed,
    deleteMed
}
