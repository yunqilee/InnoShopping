import React, {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/shop-context";
import {CartItem} from "./CartItem";
import "./cart.css"


export const Cart = () => {
    const [products, setProducts] = useState([])
    const {cartItems, getTotalCartAmount} = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

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
            {totalAmount > 0 ? (
                <div className="checkout">
                    <p>Subtotal: ${totalAmount}</p>
                </div>
            ) : (
                <h3>Your Shopping Cart is Empty</h3>
            )}
        </div>
    )
}