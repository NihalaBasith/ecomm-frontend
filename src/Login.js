import Header from './Header';
import React, {useState,useEffect} from "react"
import {useNavigate } from "react-router-dom"

function Login(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate  = useNavigate ();
    
    useEffect(()=>{
        if (localStorage.getItem('user_info')){
            navigate ("/add")
            
        }

    },[])

    return (
        <div>
                <Header/>

            <div className="col-sm-6 offset-sm-3">
              
              <h1>Login Page</h1>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}className="form-control" placeholder="Email"/><br/>
              <input type="password"value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password"/><br/>
              <button onClick={signIn} className="btn btn-primary">Sign In</button>
          </div>
        </div>
    )
    async function signIn(){
        let item ={email,password}
        let result = await fetch("http://127.0.0.1:8080/api/login",{
            method:"post",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
        result = await result.json();

        if (result.user) {
            localStorage.setItem("user_info", JSON.stringify(result.user));
            navigate("/add");
        }

    }
};

export default Login