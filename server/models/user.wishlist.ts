
import mongoose,{Schema,Document,Types} from "mongoose";

interface IUserProduct{
    productId?:Types.ObjectId;
    addedAt?:Date;
}

interface IUserWishlist extends Document{
    userId:Types.ObjectId;
    products:IUserProduct[];
    createdAt?:Date;
    updatedAt?:Date;
}

const userWishlistSchema = new mongoose.Schema<IUserWishlist>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product',
                required:true,
        },
        addedAt:{
            type:Date,
            default:Date.now    
        }
        }],
},{timestamps:true});

const UserWishlist = mongoose.model<IUserWishlist>('UserWishlist',userWishlistSchema);

export default UserWishlist;