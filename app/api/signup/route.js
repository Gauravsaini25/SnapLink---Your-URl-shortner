import {connectToDB} from '@/lib/mongodb';
import User from '@/models/User';
import bcyrpt from 'bcryptjs';

export async function POST(req){
    console.log("signup request received");
    const {email,password,username}=await req.json();
    await connectToDB();

    const existingEmail=await User.findOne({email});
    // new Response(JSON.stringify({ error: "user created successfully" }), { status: 201});
    if(existingEmail) return new Response(JSON.stringify({ message: "this email is already registered",success:false }), { status: 400 });
    const existingUsername=await User.findOne({username});

    if(existingUsername) return new Response(JSON.stringify({ message: "this username is already registered",success:false }), { status: 400 });

    const hashedPassword=await bcyrpt.hash(password,10);
    
    const newUser=new User({email,password:hashedPassword,username,links:[]});
    await newUser.save();

    return new Response(JSON.stringify({ message: "user created successfully",success:true }), { status: 201});
}
