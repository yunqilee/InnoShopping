import React from "react";
import {Link} from "react-router-dom";
import {ShoppingBag, ShoppingCart, MagnifyingGlass} from "phosphor-react";
import {useSearch} from "../context/SearchContext";
import "./navbar.css"

export const Navbar = () => {
    const {searchTerm, setSearchTerm} = useSearch();

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Search Term:', searchTerm)
    }

    return <div className="navbar">
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
    </div>;
}