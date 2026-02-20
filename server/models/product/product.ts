import {Schema,model} from "mongoose";

interface iProduct{
    name:string;
    description:string;
    price:number;
    category:string;
    imageUrl:string;
    stock:number;
}

const productSchema = new Schema<iProduct>({
    name:{
        type:String,
        required:[true,"Procuct name is required"],
        minlength:[3,"product name must be at least 3 character long "],
        maxlength:[100,"product name must be less than 100 character long"]
    },
    description:{
        type:String,
        required:[true,"product description is required"],
        minlength:[10,"product description must be at least 3 character long "],
        maxlength:[1000,"product description must be less than 100 character long"]
    },
    price:{
        type:Number,
        required:[true,"product price is requied"],
        min:0,
        set:(v:number)=>Math.round(v*100)/100
    },
    category:{
        type:String,
        required:[true,"product category is required"],
    },
    imageUrl:{
        type:String,
        required:[true,"product image url is required"]
    },
    stock:{
        type:Number,
        required:[true,"product stock is required"],
        min:0
    }
});

const productModel = model<iProduct>('product',productSchema);

export default productModel;