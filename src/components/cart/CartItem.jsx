import React, {useContext} from "react";
import {ShopContext} from "../context/shop-context";


export const CartItem = (props) => {
    const { id, title, price, thumbnail, description } = props.data;
    const {cartItems, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext);

    const handleBlur = () => {
        const currentAmount = cartItems[id];
        if (isNaN(currentAmount) || currentAmount < 1) {
            updateCartItemCount(1, id);
        }
    };

    return (
        <div className="cartItem">
            <img alt={title} src={thumbnail} />
            <div className="description">
                <p>
                    <b>{title}</b>
                </p>
                <p className="cartItemPrice"> Price: ${price}</p>
            </div>
            <div className="countHandler">
                <button onClick={() => removeFromCart(id)}>-</button>
                <input
                    value={cartItems[id]}
                    onChange={(e) => updateCartItemCount(e.target.value, id)}
                    onBlur={handleBlur}
                />
                <button onClick={() => addToCart(id)}>+</button>
            </div>
        </div>
    )
}