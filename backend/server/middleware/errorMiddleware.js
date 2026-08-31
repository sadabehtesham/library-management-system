class ErrorHandler extends Error{
  constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;
  }
}

export const errorMiddleware = (err,req,res,next)=>{
  err.message=err.message || "Internal Server Error";
  err.statusCode=err.statusCode || 500;

  if(err.code===11000){
    const statusCode=400;
    const duplicateField = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
    const message = `Duplicate value entered for ${duplicateField}`;
    err=new ErrorHandler(message, statusCode);
  }
  if(err.name==="JsonWebTokenError"){
    const statusCode=400;
    const message=`Invalid Token`;
    err=new ErrorHandler(message, statusCode);
  }
   if(err.name==="TokenExpiredError"){
    const statusCode=400;
    const message=`Token Expired`;
    err=new ErrorHandler(message, statusCode);
  }
   if(err.name==="CastError"){
    const statusCode=400;
    const message=`Invalid ID: ${err.path}`;
    err=new ErrorHandler(message, statusCode);
  }

  const errorMessage=err.errors 
    ? Object.values(err.errors)
       .map((error)=>error.message)
         .join(" ")
    : err.message;

    return res.status(err.statusCode).json({
      success:false,
      message:errorMessage,
    });
};

export default ErrorHandler;