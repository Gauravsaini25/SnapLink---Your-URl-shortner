import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function POST(req){
    const session=await getServerSession(authOptions);
    if(!session){
        return Response.json({success:false,message:"Not authenticated"},{status:401});
    }

    const data=await req.json();
    const {shorturl}=data;
    if(!shorturl){
        return Response.json({success:false,message:"Invalid request"},{status:400});
    }
    await connectToDB();
    const user=await User.findOne({email:session.user.email}).select("links");
    const links=user?.links || [];
    const url=links.find(link=>link.shortUrl===shorturl);
    if(!url){
        return Response.json({success:false,message:"URL not found"},{status:404});
    }else{
        return Response.json({success:true,originalUrl:url.originalUrl});
    }

}