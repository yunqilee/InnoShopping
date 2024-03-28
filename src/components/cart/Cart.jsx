import React, {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/shop-context";
import {CartItem} from "./CartItem";


export const Cart = () => {
    const [products, setProducts] = useState([])
    const {cartItems} = useContext(ShopContext);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div className="cart">
            <div>
                <h3>Your Cart Items</h3>
            </div>
            <div className="cart">
                {products.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem data={product} />
                    }
                })}
            </div>
        </div>
    )
}