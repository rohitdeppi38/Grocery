import mongoose, {Schema,Types,Document} from "mongoose";

interface IUserProduct{
    productId?:Types.ObjectId;
    quantity?:number;
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
                ref:'Product',
                required:true,
            },
            quantity:{
                    type:Number,
                    required:true,
                    default:1
                },
            addedAt:{
                type:Date,
                default:Date.now
            }
        }
    ],
},{timestamps:true});

const userCart = mongoose.model<IUserCart>('UserCart',userCartSchema);

export default userCart;
