import React, {useContext, useEffect, useState} from "react";
import {Product} from "./Product";
import {ShopContext} from "../context/ShopContext";
import {useSearch} from "../context/SearchContext";
import "./Product.css"
export const ProductList = () => {
    const [products, setProducts] = useState([])
    const {searchTerm} = useSearch();
    const {cartItems, addToCart} = useContext(ShopContext)


    useEffect(() => {
        const fetchProducts = async () => {
            let url = 'https://dummyjson.com/products'
            if (searchTerm.trim().length > 0) {
                url = `https://dummyjson.com/products/search?q=${searchTerm}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                setProducts(data.products || data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchProducts();
    }, [searchTerm]);

    return (
        <div className="product">
            <div className="container grid3">
                {products.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        cartItemsCount={cartItems[product.id] || 0}
                    />
                ))}
            </div>
        </div>
    )
}