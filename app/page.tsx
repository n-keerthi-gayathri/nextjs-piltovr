"use client"
import Link from "next/link";
import { useState } from "react";

export default function Home(){
  const [data, setData] = useState(null);
  const handleClick = async (e: { preventDefault: () => void; }) => {
    
    e.preventDefault();
    const url = `/api/register1`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            });
            const data = await response.json();

            // Print response to console
            console.log(data);
    
            if (response.status === 200) {
                console.log('Data retrieval successful!',data.data);
                setData(data.data);
            } else {
                console.error('Data retrieval failed!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
  };
  return(
    <>
    <h1>Welcome to Piltovr</h1>
    <Link href="/login">Login</Link>
    <Link href="/register">Register</Link>
    <Link href="/forgot-details">Forgot Your Details? </Link>
    <button onClick={handleClick}>Get data</button>
    {
      (data != null) ?
      <p>{data[0].email}</p>:
      ""
    }
    </>
  )
}