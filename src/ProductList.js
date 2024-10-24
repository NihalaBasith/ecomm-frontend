import Header from './Header';
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function ProductList() {
    const [data, setData] = useState([]);

    useEffect(() => {

        getdata();
    }, []);

    async function getdata() {
        try {
            let response = await fetch('http://127.0.0.1:8080/api/list');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    async function deleteProduct(id) {
            try {
                let response = await fetch(`http://127.0.0.1:8080/api/delete/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                alert("Product deleted successfully!");
                getdata();
            } catch (error) {
                console.error("Failed to delete product:", error);
                alert("Failed to delete product!");
            }
    }
    return (
        <div>
            <Header />
            <h1>Product List Page</h1><br />
            <div className="col-sm-8 offset-sm-2">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Sales Price</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td><img style={{ width: 100 }} src={"http://127.0.0.1:8080/storage/" + item.file_path} alt={item.name} /></td>
                                    <td>{item.price}</td>
                                    <td>{item.sales_price}</td>
                                    <td>{item.description}</td>
                                    <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-info btn-sm me-2">Update</button>
                                    </Link>
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => deleteProduct(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ProductList;
