import { NextApiRequest } from "next";
import db from "../../config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const results = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM user_data", (err: any, data1: []) => {
                if(err){
                    reject(err);
                    // return NextResponse.json({status: 404, message: "Data Not Found"})
                }else{
                    resolve(data1);
                    console.log(data1);
                    // return NextResponse.json({status: 200, message: "Data found",data: data1});
                }
            });            
        });
        console.log(results);
        return NextResponse.json({status: 200, message: "Data found",data: results});
        // console.log(results);
        // return Response.json(results);
    } catch (error) {
        return NextResponse.json(
            { message: error},
            { status: 500}
        )
    }
}
export async function POST(req: any){
    try {
        // const reqBody = await data.json();
        // const { full_name, email, mobile_number, password } = reqBody; 
        
        const url = req.nextUrl.search;
        const full_name = url.get('full_name');
        const email = url.get('email');
        const mobile_number = url.get('mobile_number');
        const password = url.get('password');
        const result = await new Promise((resolve, reject) => {
            db.query("INSERT INTO `user_data`(`full_name`, `email`, `mobile_number`, `password`) VALUES (?,?,?,?)", 
                     [full_name, email, mobile_number, password], 
                     (err: any, result: any) => {
                if (err) {
                    // console.error("Database error:", err);
                    // return result.status(500).json({ message: "Internal Server Error" });
                    reject(err);
                } else {
                    resolve(result);
                }
            });            
        });

        console.log("New user inserted:", result);

        return NextResponse.json(
            { message: "User inserted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}
