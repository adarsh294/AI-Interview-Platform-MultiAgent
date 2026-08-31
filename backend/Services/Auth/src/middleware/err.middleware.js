
export const err= async (err,req,res,next)=>{
    const statusCode = err.statusCode ||err.statuscode ||err.status || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

}; 