// all the configuration and use of middlewares, routing will be done here
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import medicineLogRouter from "./routes/medicineLog.routes.js"
import historyRouter from "./routes/history.routes.js"

const app = express()

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/medicine-log", medicineLogRouter)
app.use("/api/v1/history", historyRouter)

export { app }