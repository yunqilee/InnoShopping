import React from "react";
import {Product} from "./Product";
import "./Product.css"
import {useGetProducts} from "../../hooks/useGetProducts";
export const ProductList = () => {
    const {products} = useGetProducts();

    return (
        <div className="product">
            <div className="container grid3">
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    )
}