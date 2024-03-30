import React from "react";
import {Link} from "react-router-dom";
import {ShoppingBag} from "phosphor-react";
import {ShoppingCart} from "phosphor-react";
import "./navbar.css"

export const Navbar = () => {
    return <div className="navbar">
        <Link to={"/"} className="logo-link">
            <h1 className="logo">InnoShopping</h1>
        </Link>
        <div className="links">
            <Link to={"/"}>
                <ShoppingBag size={24} />
            </Link>
            <Link to={"/cart"}>
                <ShoppingCart size={24} />
            </Link>
        </div>
    </div>;
}