import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectToDB();
                const user = await User.findOne({ email: credentials.email });
                if (!user) throw new Error("No user found with this email");

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) throw new Error("Incorrect password");

                return { id: user._id, email: user.email, username: user.username };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id;
                token.email=user.email;
                token.username=user.username;
            }
            return token;
        },
        async session({session,token}){
            await connectToDB();
            const user=await User.findById(token.id).lean();

            session.user={
                id:token.id,
                email:token.email,
                username:token.username,
                urls:user?.links || []
            };

            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 



