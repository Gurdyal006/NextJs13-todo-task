
import {  cookieSetter, generateToken } from "@/utils/features";

const { asyncError, errorHandler } = require("@/middlewares/error");



const handler = asyncError(async (req, res) => {
    if(req.method !== 'GET') return errorHandler(res, 400, "Only GET method allowed")

 
    cookieSetter(res, null, false)


    res.status(200).json({
        success:true,
        message:"Loggedout Successfully",
    })

})

export default handler