import React, {useContext, useEffect, useState} from "react";
import {Product} from "./Product";
import {ShopContext} from "../../context/ShopContext";
import {useSearch} from "../../context/SearchContext";
import "./Product.css"
export const ProductList = () => {
    const [products, setProducts] = useState([])
    const {searchTerm, selectedCategory} = useSearch();
    const {cartItems, addToCart} = useContext(ShopContext)


    useEffect(() => {
        const fetchProducts = async () => {
            let url = 'http://localhost:3001/product'
            if (searchTerm.trim().length > 0) {
                url += `/search?q=${searchTerm}`;
            } else if (selectedCategory) {
                url += `/category/${selectedCategory}`;
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
    }, [searchTerm, selectedCategory]);

    return (
        <div className="product">
            <div className="container grid3">
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}
                        addToCart={addToCart}
                        cartItemsCount={cartItems[product._id] || 0}
                    />
                ))}
            </div>
        </div>
    )
}