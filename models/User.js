import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    username: {type:String,required:true,unique:true},
    links:[
        {originalUrl:String,
            shortUrl:String,
            createdAt:{type:Date,default:Date.now}
        }
    ]
});

export default mongoose.models.User || mongoose.model("User",UserSchema);    
