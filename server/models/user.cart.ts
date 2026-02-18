import mongoose, {Schema,Types,Document} from "mongoose";

interface IUserProduct{
    productId?:Types.ObjectId;
    addedAt?:Date;
}

interface IUserCart extends Document{
    userId:Types.ObjectId;
    products:IUserProduct[];
    createdAt?:Date;
    updatedAt?:Date;
}



const userCartSchema = new Schema<IUserCart>({
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
        }
    ]
},{timestamps:true});

const UserCart = mongoose.model<IUserCart>('UserCart',userCartSchema);

export default UserCart;
