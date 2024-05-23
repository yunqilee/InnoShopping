import {createContext, useState, useEffect} from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsAndInitializeCart = async () => {
            try {
                const response = await fetch('http://localhost:3001/product');
                const data = await response.json();
                const initialCart = {};
                data.products.forEach(product => {
                    initialCart[product._id] = 0;
                });
                setCartItems(initialCart);
                setProducts(data.products);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProductsAndInitializeCart();
    }, []);


    const getTotalCartAmount = () => {
        if (products.length === 0) return 0;
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find(
                    (product) => product._id === item
                )

                totalAmount += cartItems[item] * itemInfo.price
            }
        }

        return totalAmount;
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Number(prev[itemId]) + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Number(prev[itemId]) - 1 }));
    };

    const updateCartItemCount = (newAmount, itemId) => {
        if (newAmount === '' || newAmount === 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
        } else if (newAmount > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
        } else {
            setCartItems(prevItems => ({
                ...prevItems,
                [itemId]: 1
            }));
        }
    };

    console.log(cartItems)
    const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}