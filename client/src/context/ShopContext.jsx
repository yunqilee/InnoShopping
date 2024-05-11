import {createContext, useState, useEffect} from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsAndInitializeCart = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                const initialCart = {};
                data.products.forEach(product => {
                    initialCart[product.id] = 0;
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
        let totalAmount = 0;
        Object.keys(cartItems).forEach(itemId => {
            const quantity = cartItems[itemId];
            if (quantity > 0) {
                const itemInfo = products.find(product => product.id === Number(itemId));
                if (itemInfo) {
                    totalAmount += quantity * itemInfo.price;
                }
            }
        });
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