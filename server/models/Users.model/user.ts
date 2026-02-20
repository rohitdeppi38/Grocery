import mongoose ,{Schema,Types,Document}from "mongoose";

interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    role:"user" | "admin";  
}

const UserSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:[true,"Name is required"],
        minlength:[3,"Name must be at least 3 characters long"],
        maxlength:[50,"Name must be less than 50 characters long"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true});

const User = mongoose.model<IUser>('User',UserSchema);

export default User;