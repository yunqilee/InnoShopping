import React from "react";

export const CartItem = (props) => {
    const { id, title, price, thumbnail, description } = props.data;

    return (
        <div className="cartItem">
            <img alt={title} src={thumbnail} />
            <div className="description">
                <p>
                    <b>{title}</b>
                </p>
                <p className="cartItemPrice"> Price: ${price}</p>
            </div>
        </div>
    )
}