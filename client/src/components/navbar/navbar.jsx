import React, {useState, useEffect, useContext} from "react";
import {Link, useLocation} from "react-router-dom";
import {ShoppingBag, ShoppingCart, MagnifyingGlass, UserCircle} from "phosphor-react";
import {useSearch} from "../../context/SearchContext";
import "./navbar.css"
import {ShopContext} from "../../context/ShopContext";

export const Navbar = () => {
    const {balance} = useContext(ShopContext);
    const {searchTerm, setSearchTerm, setSelectedCategory} = useSearch();
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    const handleLogoClick = () => {
        setSelectedCategory('');
    }

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
            <Link to={"/"} onClick={handleLogoClick} className="logo-link">
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
                <Link to={"/auth"}>
                    <UserCircle size={24}/>
                </Link>
                <Link to={"/"}>
                    <ShoppingBag size={24}/>
                </Link>
                <Link to={"/cart"}>
                    <ShoppingCart size={24}/>
                </Link>
                <span> Balance: ${balance} </span>
            </div>
        </div>
        {location.pathname !== '/cart' && location.pathname !== '/auth' && location.pathname !== '/register' && (
            <div className="categories">
                {categories.map((category) => (
                    <button key={category.id} onClick={() => handleCategorySelect(category.name)} className="category-link">
                        {category.name}
                    </button>
                ))}
            </div>
        )}
    </div>;
}