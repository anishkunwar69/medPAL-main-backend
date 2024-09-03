// import bcrpyt from "bcrypt"
// import { OtpVerification } from "../models/otpVerification.models.js";
// import nodemailer from "nodemailer"
// import { ApiResponse } from "./ApiResponse.js";

// async function createOTP({_id,email},res){
//     try {
//         const otpOptions =[1,2,3,4,5,6,7,8,9];
//         let otp='';
//         for(let i=0;i<4;i++){
//             let randomIndex = Math.floor(Math.random() * otpOptions.length);
//             otp = otp+otpOptions[randomIndex]
//         }

//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             service:'Gmail',
//             port: 587,
//             secure: false, // Use `true` for port 465, `false` for all other ports
//             auth: {
//               user: "anishkunwar808@gmail.com",
//               pass: "Kunwaranish9749419105",
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//         });

//         const mailOptions = {
//             from: '"Anish Kunwar" <anishkunwar808@gmail.com>',
//             to: email,
//             subject: "OTP Verification",
//             html: "<p>Please Verify Your Account. Here's The OTP <b>Hello world?</b>. Expires In 10 minutes</p>", // html body
//         };

//         const hashedOTP = await bcrpyt.hash(otp,10);

//         const createdOTP = await OtpVerification.create({
//             userId:_id,
//             otp:hashedOTP,
//             createdAt:Date.now(),
//             expiresAt:Date.now() + 10 * 60 * 1000
//         });

//         await transporter.sendMail({
//             from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//             to: email, // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>", // html body
//           })
        

//     } catch (error) {
//         return res.json(
//             new ApiResponse("something went wrong",null,false,500)
//         ).status(500)
//     }
// }

// export {
//     createOTP
// }