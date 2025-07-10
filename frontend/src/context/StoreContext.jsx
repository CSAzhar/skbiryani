import { createContext, useEffect, useState } from "react";
import ApiService from "../services/ApiServices";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const [foodQuantity, setFoodQuantity] = useState({});
    const [category, setCategory] = useState([]);
    const [token, setToken] = useState("");

    const getAllFood = async () => {
        const response = await ApiService.getAllFood();
        if (response) {
            setFoodList(response);
        } else {
            toast.error("Error while loading foods");
        }
    }

    const increaseFoodQuantity = async (foodId) => {
        if(!token){
            toast.warning('Login or Signup to add Items');
            return;
        }
       const response = await ApiService.addFoodQuantityTocart(foodId, token);
       setFoodQuantity(response.items);
    //    console.log(foodQuantity);
    }

    const decreseFoodQuantity = async (foodId) => {
        const response = await ApiService.removeFoodQuantityTocart(foodId, token);
        setFoodQuantity(response.items);
    }
    const getFoodQuantity = async () => {
        const response = await ApiService.getFoodQuantityTocart(token);
        setFoodQuantity(response.items);
    }
    const fetchCategory = async () => {
        const response = await ApiService.getAllCategory();
        if (response) {
          setCategory(response);
        } else {
          toast.error("Error while loading foods");
        }
      };
    const contextValue = {
        foodQuantity,
        setFoodQuantity,
        increaseFoodQuantity,
        decreseFoodQuantity,
        foodList,
        token,
        setToken,
        category
    };

    useEffect(() => {
        // On first load, check localStorage
        getAllFood();
          fetchCategory();
        const localToken = localStorage.getItem('token');
        if (localToken) {
          setToken(localToken);
        }
      }, []);
      
      useEffect(() => {
        if (token) {
          getFoodQuantity(token);  // only runs when token is ready
        }
      }, [token]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}