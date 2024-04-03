import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {ShoppingBag, ShoppingCart, MagnifyingGlass} from "phosphor-react";
import {useSearch} from "../context/SearchContext";
import "./navbar.css"

export const Navbar = () => {
    const {searchTerm, setSearchTerm, setSelectedCategory} = useSearch();
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Search Term:', searchTerm)
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    }

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return <div className="navbar">
        <div className="navbar-top">
            <Link to={"/"} className="logo-link">
                <h1 className="logo">InnoShopping</h1>
            </Link>
            <div className="links">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                        <MagnifyingGlass size={24}/>
                    </button>
                </form>
                <Link to={"/"}>
                    <ShoppingBag size={24}/>
                </Link>
                <Link to={"/cart"}>
                    <ShoppingCart size={24}/>
                </Link>
            </div>
        </div>
        {location.pathname !== '/cart' && (
            <div className="categories">
                {categories.map((category, index) => (
                    <button key={index} onClick={() => handleCategorySelect(category)} className="category-link">
                        {category}
                    </button>
                ))}
            </div>
        )}
    </div>;
}