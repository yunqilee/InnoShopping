import React, {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/shop-context";
import "./Product.css"
export const Product = () => {

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
                {products.map(product => {

                    const cartItemsCount = cartItems[product.id] || 0;

                    return (
                        <div key={product.id}>
                            <h3>{product.title}</h3>
                            <img src={product.thumbnail} alt={product.title} style={{width: '100px', height: '100px'}}/>
                            <p>{product.description}</p>
                            <p className="product-price">Price: ${product.price}</p>
                            <button className="addToCartBtn" onClick={() => addToCart(product.id)}>
                                Add to Cart {cartItemsCount > 0 && <> ({cartItemsCount})</>}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}