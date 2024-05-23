import {useState, useEffect} from "react";
import axios from "axios";

export const useGetProducts = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const products = await axios.get("http://localhost:3001/product");
        setProducts(products.data.products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, fetchProducts };
}