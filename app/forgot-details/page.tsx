"use client"
import React, { useState } from 'react';
export default function forgotDetails(){
    const [email, setEmail] = useState('');
    const [data, setData] = useState(null);
    const [exist,setExist] = useState(null);
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    const url = `/api/forgot-details/${email}`;    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        });
        const Data = await response.json();

        // Print response to console
        console.log(Data);

        if (Data.status === 200) {
            console.log('Data retrieval successful!',Data.isRegistered);
            setData(Data.data);
            setExist(Data.isRegistered);
        } 
        // console.log("You are not a register user!");
        else {
            console.error('Data retrieval failed!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    };
    return(
        <>
        <h3>Enter your registered email!</h3>
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br />
                <button type="submit">Get Details</button>
        </form>
        {
            (data != null) ?
            <>
            <h2>Here are your details...</h2>
            <h4>Name: {data[0].full_name}</h4>
            <h4>Email: {data[0].email}</h4>
            <h4>Mobile Number:{data[0].mobile_number}</h4>
            </>
            : ""
        }
        {
            (exist === false) ? 
            <h2>You are not a registered user</h2>
            : null
        }
        </>
    )
}