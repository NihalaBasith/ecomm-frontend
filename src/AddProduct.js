import Header from './Header';
import React, {useState,useEffect} from "react"
import {useNavigate } from "react-router-dom"

function AddProduct(){
    const [name,setName]=useState("")
    const [file,setFile]=useState(null);
    const [description ,setDescription]=useState("")
    const [price ,setPrice]=useState("")
    const [salesprice ,setSalesprice]=useState("")
    const navigate  = useNavigate ();
    return (
        
        <div>
                <Header/>

            <div className="col-sm-6 offset-sm-3">
              
            <h1>AddProduct Page</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name"/><br/>
            <input type="file"  onChange={(e)=>setFile(e.target.files[0])}className="form-control" placeholder="File"/><br/>
            <input type="description"value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Description"/><br/>
            <input type="price"value={price} onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Price"/><br/>
            <input type="salesprice"value={salesprice} onChange={(e)=>setSalesprice(e.target.value)} className="form-control" placeholder="Sales Price"/><br/>
            <button onClick={addproduct} className="btn btn-primary">Add</button>
        </div>
        </div>

    )
    async function addproduct(){
        let item ={name,file,description,price,salesprice}
        const formData = new FormData();
        formData.append('name',name);
        formData.append('file',file);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('salesprice',salesprice);
        
        

        let result = await fetch("http://127.0.0.1:8080/api/addproduct",{
            method:"post",
            body:formData
        })

    }
};

export default AddProduct;