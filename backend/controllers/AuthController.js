const bcrypt=require("bcrypt");
const UserModel=require("../models/user");
const jwt=require("jsonwebtoken");

const signup=async(req,res)=>{
    try{
const{name,email,password}=req.body;
const user=await UserModel.findOne({email});
if(user){
    return res.status(409).json({message:"user is already exist,you can login",success:false});

}
const userModel=new UserModel({name,email,password});
userModel.password=await bcrypt.hash(password,10);
await userModel.save();
res.status(201).json({message:"Signup Successfully",success:true})
    }catch(err){
        res.status(500).json({
            message:"Internal server error",
            success:false})
    }
}


const login=async(req,res)=>{
    try{
const{email,password}=req.body;
const user=await UserModel.findOne({email});
const errMsg='Auth failed email or password is wrong';
// console.log(user);
// console.log(email);
// console.log(password);
if(!user){
    return res.status(409).json({errMsg,success:false});

}
const isPassEqual=await bcrypt.compare(password,user.password);
if(!isPassEqual)
{
    return res.status(401).json({
        message:errMsg,
        success:false
    })
}else{
    console.log("Password matched");
}
const jwtToken=jwt.sign({email:user.email,
    _id:user._id
},
process.env.JWT_SECRET,
{
    expiresIn:"24h"
})


res.status(201).json({
    message:"Login success",
    success:true,
    jwtToken,
    email,
    name:user.name
})
    }
    catch(err){
        res.status(400).json({
            message:"Internal server Error",
            success:false
        })
    }
}



 module.exports={ signup,login}