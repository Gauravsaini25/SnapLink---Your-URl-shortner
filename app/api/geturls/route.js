import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";


export async function GET(req){
    const session=await getServerSession(authOptions);
    if(!session){
        return Response.json({success:false,message:"Not authenticated"},{status:401});
    }

    await connectToDB();
    const user=await User.findOne({email:session.user.email}).select("links");
    return Response.json({success:true,links:user?.links || []}); 
}