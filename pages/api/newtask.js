import { checkAuth, connectDB } from "../../utils/features"
import {Task} from "../../models/task"
import { asyncError, errorHandler } from "@/middlewares/error"

const handler = asyncError(
    async (req, res) =>{

        if(req.method!=="POST") return errorHandler(res, 400, "Only POST method is allowed")
        await connectDB()
    
        const {title, description } = req.body

        if(!title || !description) return errorHandler(res, 400, "Please fill all details")

        const user = await checkAuth(req)

        if(!user) return errorHandler(res, 401, "Login First")
    
        const createTask = await Task.create({
            title,
            description,
            user: user._id
        })
    
    
        res.json({
            success:true,
            message: "Task Created",
            createTask
        })
    }
)

export default handler