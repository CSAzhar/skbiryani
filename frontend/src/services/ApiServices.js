import axios from "axios";
import { toast } from "react-toastify";

export default class ApiService{

    static BASE_URL_FOOD = 'http://localhost:8002/skb/food/';
    static BASE_URL_CAT = 'http://localhost:8002/skb/category/';

    static async getAllFood(){
        try{
            const response = await axios.get(this.BASE_URL_FOOD);
            if(response.status === 200){
                console.log(response);
                return response.data;

            }else{
                toast.error('Error fetching Food list in api');
                console.log(response);
            }
        } catch(error)
        {
            toast.error('Api error', error);
            throw error;
        }
    }

    static async getAllCategory(){
        try{
            const response = await axios.get(this.BASE_URL_CAT);
            if(response.status === 200){
                return response.data;
            }else{
                toast.error('Error fetching Food list in api');
            }
        } catch(error)
        {
            toast.error('Api error', error);
            throw error;
        }
    }

    static BASE_URL_CART = 'http://localhost:8002/skb/cart/';

    static async addFoodQuantityTocart(foodId, token){
        try {
        const response = await axios.post(
            `${this.BASE_URL_CART}add`,
            { foodId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            toast.error(`Unexpected response status: ${response.status}`);
            return null;
        }

    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            const status = error.response.status;

            if (status === 401) {
                toast.error("Unauthorized. Please login again.");
            } else if (status === 403) {
                toast.error("Login to add items.");
            } else if (status === 500) {
                toast.error("Server error. Please try again later.");
            } else {
                toast.error(`Request failed with status ${status}: ${error.response.data?.message || "Unknown error"}`);
            }

        } else if (error.request) {
            // Request was made but no response
            toast.error("No response from server. Please check your connection.");
        } else {
            // Something else happened
            toast.error(`Error in request: ${error.message}`);
        }

        console.error("API error in addFoodQuantityTocart:", error);
        return null;
    }
    }

    static async removeFoodQuantityTocart(foodId, token){
        try{
            const response = await axios.post(
                `${this.BASE_URL_CART}remove`, 
                {foodId},
                {headers: { Authorization: `Bearer ${token}`}}
            );
            if(response.status === 200){
                return response.data;
            }else{
                toast.error('Error fetching Food list in api');
            }
        } catch(error)
        {
            toast.error('Api error', error);
            throw error;
        }
    }

    static async getFoodQuantityTocart(token){
        try{
            const response = await axios.get(
                `${this.BASE_URL_CART}`,
                {headers: 
                    { 
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if(response.status === 200){
                return response.data;
            }else{
                toast.error('Error fetching Food list in api');
            }
        } catch(error)
        {
            console.error('Api error', error);
            return null;
        }
    }

    static async clearCart(token){
        try{
            const response = await axios.delete(
                `${this.BASE_URL_CART}`,
                {headers: { Authorization: `Bearer ${token}`}}
            );
            if(response.status === 200){
                return response.data;
            }else{
                console.error('Error clearing cart in api');
            }
        } catch(error)
        {
            console.error('Api error', error);
            throw error;
        }
    }

    static BASE_URL_ORDER = 'http://localhost:8002/skb/order/';

    static async createOrder(orderData, token){
        // console.log('Final Order Data JSON:', JSON.stringify(orderData, null, 2));
        try {
            console.log('data in service', orderData);
            const response = await axios.post(
                `${this.BASE_URL_ORDER}create`,
                orderData,
                {
                    headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    }
                }
            );
            if(response.status === 200){
                console.log(response.data);
                return response.data;
            }else{
                console.log(response.data);
            }
        } catch (error) {
            console.error(`Order request failed`);
        }
    }

    static async verifyPaymentOrder(paymentData, token){
        try {
            // console.log('data in service', orderData)
            const response = await axios.post(
                `${this.BASE_URL_ORDER}verify`,
                paymentData,
                {headers: { Authorization: `Bearer ${token}`}}
            );
            if(response.status === 200){
                
                return {
                    statusCode:200,
                    message: 'successful'
                }
            }
        } catch (error) {
            console.error(`Order request failed`);
        }
    }

    static async deleteOrder(orderId, token){
        try {
            // console.log('data in service', orderData)
            const response = await axios.delete(
                `${this.BASE_URL_ORDER}${orderId}`,
                {headers: { Authorization: `Bearer ${token}`}}
            );
            if(response.status === 204){
                return {
                    statusCode: 200,
                    message: 'successful'
                }
            }
        } catch (error) {
            console.error(`Order deletion failed`);
        }
    }




    static async fetchOrdersOfUser(token){
        try {
            const result = await axios.get(
                `${this.BASE_URL_ORDER}`,
                {headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if(result.status === 200){
                return result.data;
            }

        } catch (error) {
            console.error('Error getting orders list');
        }
    }

    

}