"use client"
import React, { useState } from 'react';
export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    //     const formData = {
    //         full_name: fullName,
    //         email: email,
    //         mobile_number: phone,
    //         password: password
    //     };
    // const url = '/api/register';
    // const url = `/api/register/?full_name=${fullName}&email=${email}&mobile_number=${phone}&password=${password}`;
    const url = `/api/register1/${fullName}/${email}/${phone}/${password}`;    
    try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Registration successful!');
            } else {
                console.error('Registration failed.',response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <h1>Enter your details to register!</h1>
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <br />
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <label>Phone:</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
