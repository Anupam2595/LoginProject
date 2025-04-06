
const jwt=require('jsonwebtoken')
const ensureAuthenticated=(req,res,next)=>{
    console.log("Authorization is Called");
    console.log("Authorization Header:", req.headers.authorization);

    const auth=req.headers.authorization;
    if(!auth){
        return res.status(401).json({
            message:"Unauthorized,JWT token is required"
        });
    }try{
        const decoded= jwt.verify(auth,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=decoded;
        next();

    }catch(err){
        return res.status(403).json({
            message:"Unauthorized,JWT token wrong or expired "
        });

    }
}

module.exports=ensureAuthenticated;