import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


export default function RefreshHandler({setIsAuthenticated}) {
    const location=useLocation();
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname==='/'||
                location.pathname==='/login'||
            location.pathname==='/signup'){
                navigate('/home',{replace:true})
            }
        }
    },[location,navigate,setIsAuthenticated])
  return (
 null
  )
}
