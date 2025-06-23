import { createContext, useState } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const [foodQuantity, setFoodQuantity] = useState({});
    const [cartQuantity, setCartQuantity] = useState(0);

    const increaseFoodQuantity = (foodId) => {
        setFoodQuantity( (prev) => ({...prev, [foodId]: (prev[foodId] || 0)+1}) );
        setCartQuantity(cartQuantity+1);
    }

    const decreseFoodQuantity = (foodId) => {
        setFoodQuantity( (prev) => ({...prev, [foodId]: prev[foodId] > 0 ? prev[foodId] -1 : 0}) );
        setCartQuantity(cartQuantity===0 ? 0 : cartQuantity-1);
    }
    const contextValue = {
        foodQuantity,
        increaseFoodQuantity,
        decreseFoodQuantity,
        cartQuantity
    };

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}