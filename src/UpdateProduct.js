import Header from './Header';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`http://127.0.0.1:8080/api/update/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };

        fetchData();
    }, [id]);

    async function productUpdate() {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('sales_price', data.sales_price);

        // Append the selected file if it exists
        if (selectedFile) {
            formData.append('file_path', selectedFile);
        }

        try {
            let response = await fetch(`http://127.0.0.1:8080/api/update/${id}`, {
                method: "post",
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const result = await response.json();
            console.log(result.message); 
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    return (
        <div>
            <Header />
            <h1>Update Product Page</h1>
            <div className="col-sm-6 offset-sm-3">
                <input
                    type="text" className="form-control"
                    value={data.name || ''} 
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                /><br />
                <input
                    type="text" className="form-control"
                    value={data.description || ''} // Avoid undefined value
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                /><br />
                <input
                    type="text" className="form-control"
                    value={data.price || ''} // Avoid undefined value
                    onChange={(e) => setData({ ...data, price: e.target.value })}
                /><br />
                <input
                    type="text" className="form-control"
                    value={data.sales_price || ''}
                    onChange={(e) => setData({ ...data, sales_price: e.target.value })}
                /><br />
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setSelectedFile(e.target.files[0])} 
                />
                {data.file_path && (
                    <img
                        style={{ width: 100 }}
                        src={`http://127.0.0.1:8080/storage/${data.file_path}`}
                        alt={data.name}
                    />
                )}
                <br />
                <button type="button" onClick={productUpdate} className="btn btn-primary">Update Product</button>
            </div>
        </div>
    );
}

export default UpdateProduct;
