import React, {useEffect, useState} from "react";
import "./Product.css"
export const Product = () => {

    const [products, setProducts] = useState([])

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
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} style={{width: '100px', height: '100px'}}/>
                        <p>{product.description}</p>
                        <p className="product-price">Price: ${product.price}</p>
                        <button className="addToCartBtn">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}