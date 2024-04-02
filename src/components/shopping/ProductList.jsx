import React, {useContext, useEffect, useState} from "react";
import {Product} from "./Product";
import {ShopContext} from "../context/ShopContext";
import "./Product.css"
export const ProductList = () => {

    const [products, setProducts] = useState([])
    const {cartItems, addToCart} = useContext(ShopContext)


    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div className="product">
            <div className="container grid3">
                {products.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        cartItemsCount={cartItems[product.id] || 0}
                    />
                ))}
            </div>
        </div>
    )
}