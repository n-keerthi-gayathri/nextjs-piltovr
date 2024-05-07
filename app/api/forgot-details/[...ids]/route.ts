import db from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET( req: any, {params}: any) {
    const email = params.ids[0];
    console.log(email);
    try {
        const results: any = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM user_data WHERE email = ?", [email],(err: any, data1: []) => {
                if(err){
                    reject(err);
                    // return NextResponse.json({status: 404, message: "Data Not Found"})
                }else{
                    resolve(data1);
                    // console.log(data1);
                    // return NextResponse.json({status: 200, message: "Data found",data: data1});
                }
            });            
        });
        console.log(results);
        // return NextResponse.json({message: "hello"});
        let arLen = results.length;
        if(arLen != 0)
            // console.log("Hello World");
            return NextResponse.json({status: 200, message: "Data found",isRegistered:true,data: results});
        else
        return NextResponse.json({status: 200, message: "Data not found",isRegistered:false});

            // console.log(results);
        // return Response.json(results);
    } catch (error) {
        return NextResponse.json(
            { message: error},
            { status: 500}
        )
    }
    // console.log(params.ids[0]);
    // return Response.json({status: 200})
}