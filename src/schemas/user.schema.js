import z from "zod";

const signUpSchema = z.object({
    firstName: z.string().min(2,{message:"First Name Is Required"}),
    lastName: z.string().min(2,{message:"Last Name Is Required"}),
    email: z.string().email({message:"Please Enter A Valid Email"}),
    password:z.string().min(8,{message:"Password Must Contain At Least 8 Characters"}),
    gender: z.string({message:"Please Specify Your Gender"}),
    DOB: z.string({message:"Please Enter Your DOB"}),
    majorDisease: z.string({message:"Please Enter Your Major Disease"})
})

const signInSchema = z.object({
    email: z.string().email({message:"Please Enter A Valid Email"}),
    password:z.string(),
})

export {
    signUpSchema,
    signInSchema
}