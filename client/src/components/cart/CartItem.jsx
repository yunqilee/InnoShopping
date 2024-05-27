import React, {useContext} from "react";
import {ShopContext} from "../../context/ShopContext";


export const CartItem = (props) => {
    const { _id, title, price, thumbnail, description } = props.data;
    const {getCartItemCount, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext);

    const handleBlur = () => {
        const currentAmount = getCartItemCount(_id);
        if (isNaN(currentAmount) || currentAmount < 1) {
            updateCartItemCount(1, _id);
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
                <button onClick={() => removeFromCart(_id)}>-</button>
                <input
                    value={getCartItemCount(_id)}
                    onChange={(e) => updateCartItemCount(e.target.value, _id)}
                    onBlur={handleBlur}
                />
                <button onClick={() => addToCart(_id)}>+</button>
            </div>
        </div>
    )
}