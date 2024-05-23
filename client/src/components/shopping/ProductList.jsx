import React, {useContext} from "react";
import {Product} from "./Product";
import {ShopContext} from "../../context/ShopContext";
import "./Product.css"
import {useGetProducts} from "../../hooks/useGetProducts";
export const ProductList = () => {
    const {cartItems, addToCart} = useContext(ShopContext)

    const {products} = useGetProducts();

    return (
        <div className="product">
            <div className="container grid3">
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}
                        addToCart={addToCart}
                        cartItemsCount={cartItems[product._id] || 0}
                    />
                ))}
            </div>
        </div>
    )
}