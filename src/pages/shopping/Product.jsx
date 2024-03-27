import React, {useEffect, useState} from "react";
export const Product = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div className="products">
            <div className="container grid3">
                {products.map(product => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} style={{width: '100px', height: '100px'}}/>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}