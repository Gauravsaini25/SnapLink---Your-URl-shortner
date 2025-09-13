import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req){
  const session=await getServerSession(authOptions);
  

  if(!session) return new Response(JSON.stringify({ message: "You must be logged in to access this resource",success:false }), { status: 401 });

  const {url,shorturl}=await req.json();

  await connectToDB();
  const user=await User.findOne({email:session.user.email});
  if(!user){
    return new Response(JSON.stringify({ message: "User not found",success:false }), { status: 400 });;
  }else{
    console.log("shorturl :",shorturl,"links :",user.links);

    const existinglink=await user.links.find(link=>link.shortUrl===shorturl);
    console.log("existing link :",existinglink);
    if(existinglink){
      return new Response(JSON.stringify({ message: "shorturl already exists",success:false }), { status: 400 });;
    }else{
      user.links.push({ originalUrl: url, shortUrl: shorturl });
      await user.save();
      return new Response(JSON.stringify({ message: "Url generated successfully",success:true }), { status: 200 });
    }
  }

  
  




};


