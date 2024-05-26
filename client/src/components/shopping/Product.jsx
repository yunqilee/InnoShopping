import {useContext} from "react";
import {ShopContext} from "../../context/ShopContext";

export const Product = (props) => {
    const { _id, title, description, price, stock, thumbnail } = props.product;
    const {getCartItemCount, addToCart} = useContext(ShopContext);

    return (
        <div key={_id}>
            <h3>{title}</h3>
            <img src={thumbnail} alt={title} style={{width: '100px', height: '100px'}}/>
            <p>{description}</p>
            <p className="product-price">Price: ${price}</p>
            <button className="addToCartBtn"
                    onClick={() => addToCart(_id)}
                    disabled={stock === 0}>
                Add to Cart {getCartItemCount(_id) > 0 && <> ({getCartItemCount(_id)})</>}
            </button>

            <div className="stockQuantity">
                {stock === 0 && <h3>out of stock</h3>}
            </div>
        </div>
    )
}