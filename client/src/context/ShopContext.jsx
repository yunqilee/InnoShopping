import {createContext, useState, useEffect} from "react";
import {useGetProducts} from "../hooks/useGetProducts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useGetToken} from "../hooks/useGetToken";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [balance, setBalance] = useState(0);
    const { products} = useGetProducts();
    const {headers} = useGetToken();
    const navigate = useNavigate();

    const getBalance = async () => {
        const resp = await axios.get(`http://localhost:3001/get-balance/${localStorage.getItem("userID")}`,
            {headers})
        setBalance(resp.data.balance)
    }

    useEffect(() => {
        const initializeCart = () => {
            const initialCart = {};
            products.forEach(product => {
                console.log(product._id)
                initialCart[product._id] = 0;
            })
            setCartItems(initialCart);
        };

        initializeCart();
    }, [products]);


    const getCartItemCount = (itemId) => {
        if (itemId in cartItems) {
            return cartItems[itemId];
        }
        return 0;
    }

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

    const checkout = async () => {
        const body = {customerID: localStorage.getItem("userID"), cartItems};
        try {
            const response = await axios.post("http://localhost:3001/product/checkout",
                body,
                {headers}
            );

            navigate("/");

        } catch (err) {
            console.log(err);
        }
    }

    console.log(cartItems)

    const contextValue = {getCartItemCount, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, checkout, balance}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}