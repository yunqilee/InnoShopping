import {createContext, useState, useEffect} from "react";

export const ShopContext = createContext(null);

const getDefaultCart = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const initialCart = {};
        data.products.forEach(product => {
            initialCart[product.id] = 0;
        });
        return initialCart;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return {};
    }
};
export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const initializeCart = async () => {
            const defaultCart = await getDefaultCart();
            setCartItems(defaultCart)
        }

        initializeCart();
    }, []);

    useEffect(() => {
        let timer;
        if (showWarning) {
            timer = setTimeout(() => setShowWarning(false), 1500)
        }

        return () => clearTimeout(timer)
    }, [showWarning]);
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const updateCartItemCount = (newAmount, itemId) => {
        if (newAmount > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
            setShowWarning(false);
        } else {
            setCartItems(prevItems => ({
                ...prevItems,
                [itemId]: 1
            }));
            setShowWarning(true);
        }
    };

    const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}