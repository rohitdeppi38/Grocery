import { lazy } from "react";


const ProductCard = lazy(()=>import(
    "../component/itemStructure"
).then((module)=>{
    return {default:module.ProductCard}
}))

export default ProductCard;