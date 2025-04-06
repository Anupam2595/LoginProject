import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSucess } from '../util';

function Login() {

    const [loginInfo,setLoginInfo]=useState({
        email:"",
        password:""
    });

    const navigate=useNavigate();
    const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    const copyLoginInfo={...loginInfo};
    copyLoginInfo[name]=value;
    setLoginInfo(copyLoginInfo);

    }
    console.log('LoginInfo->',loginInfo)

    const handleLogin=async(e)=>{
        e.preventDefault();
        const {email,password}=loginInfo;
        if(!email||!password){
            return handleError("All feilds are Required");
        }
        try{

            const url="http://localHost:8088/auth/login";
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
             body:JSON.stringify(loginInfo)
            });
            const result= await response.json();
            // console.log("This is result",result)
            const {success,message,jwtToken,name,error}=result;
            if(success){
                handleSucess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            }else if(error){
              console.log("I have entered herer")
                const details=error?.details[0].message;
                handleError(details);
            }else if(!success){
              console.log("I have entered in the false block");
              console.log(message);
                handleError(message);
            }
            console.log(result)
        }catch(err){

        }
    }
   
  return (
    <div className='container'>
    <h1>Login</h1>
    <form  onSubmit={handleLogin}>
            <div>
            <label htmlFor='email'>Email: </label>
            <input
             onChange={handleChange}
            type='email'
            name='email'
            autoFocus
            placeholder='Enter your email:'></input>
            </div>
            <div>
            <label htmlFor='password'>Password: </label>
            <input
             onChange={handleChange}
            type='password'
            name='password'
            autoFocus
            placeholder='Enter your password:'></input>

        </div>
        <button>Login</button>
        <span>Don't have an account ?
        <Link to="/signup">signup</Link></span>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Login

