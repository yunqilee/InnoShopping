import React, {useContext} from "react";
import {ShopContext} from "../../context/ShopContext";
import {CartItem} from "./CartItem";
import {useGetProducts} from "../../hooks/useGetProducts";
import {useNavigate} from "react-router-dom";
import "./cart.css"


export const Cart = () => {
    const {getCartItemCount, getTotalCartAmount} = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const {products} = useGetProducts();
    const navigate = useNavigate();

    return (
        <div className="cart">
            {totalAmount > 0 ? (
                <div className="checkout-info">
                    <p>Subtotal: ${totalAmount}</p>
                    <button onClick={() => navigate("/")}>Continue Shopping</button>
                    <button>Checkout</button>
                </div>
            ) : (
                <h3>Your Shopping Cart is Empty</h3>
            )}
            <div>
                <h3>Your Cart Items</h3>
            </div>
            <div className="cart">
                {products.map((product) => {
                    if (getCartItemCount(product._id) !== 0) {
                        return <CartItem key={product._id} data={product} />
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    )
}