import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ element }) => {
    const navigate = useNavigate(); 

    useEffect(() => {
       
        if (!localStorage.getItem('user_info')) {
            navigate("/login");
        }
    }, [navigate]); 
    return (
        <>
            {element} 
        </>
    );
};

export default Protected;
