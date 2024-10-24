import React, {useState,useEffect} from "react"
import {useNavigate } from "react-router-dom"
import Header from './Header';



function Register(){
    useEffect(()=>{
        if (localStorage.getItem('user_info')){
            navigate ("/add")
            
        }

    },[])
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate  = useNavigate ();
    return (
        <div>
              <Header/>
        <div className="col-sm-6 offset-sm-3">
              
            <h1>Register Page</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name"/><br/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}className="form-control" placeholder="Email"/><br/>
            <input type="password"value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password"/><br/>
            <button onClick={signUp} className="btn btn-primary">Sign Up</button>
        </div>
        </div>
    )
    async function signUp(){
        let item ={name,email,password}
        let result = await fetch("http://127.0.0.1:8080/api/register",{
            method:"post",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
        result = await result.json()
        localStorage.setItem("user_info",JSON.stringify(result))
        navigate ("/add")

    }
};

export default Register