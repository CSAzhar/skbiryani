import { createContext, useEffect, useState } from "react";
import ApiService from "../services/ApiServices";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const [foodQuantity, setFoodQuantity] = useState({});
    const [cartQuantity, setCartQuantity] = useState(0);
    const [token, setToken] = useState("");

    const getAllFood = async () => {
        const response = await ApiService.getAllFood();
        if (response) {
            setFoodList(response);
        } else {
            toast.error("Error while loading foods");
        }
    }

    const increaseFoodQuantity = (foodId) => {
        setFoodQuantity((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
        setCartQuantity(cartQuantity + 1);
    }

    const decreseFoodQuantity = (foodId) => {
        setFoodQuantity((prev) => ({ ...prev, [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0 }));
        setCartQuantity(cartQuantity === 0 ? 0 : cartQuantity - 1);
    }
    const contextValue = {
        foodQuantity,
        increaseFoodQuantity,
        decreseFoodQuantity,
        cartQuantity,
        foodList,
        token,
        setToken
    };

    useEffect(() => {
        getAllFood();
    }, [])

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}