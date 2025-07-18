import axios from "axios";
import { toast } from "react-toastify";



export default class OrderApiService{

   static BASE_URL = 'http://localhost:8002/skb/order/';


   static async getAllOrders(){
    try{
        const response = await axios.get(`${this.BASE_URL}all-admin`);
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

   static async updateOrderStatus(orderId, status){
    try{
        const response = await axios.patch(`${this.BASE_URL}${orderId}?orderStatus=${status}`);
        if(response.status === 200){
            return {
                statusCode: 200,
                message: "successful"
            }
        }else{
            toast.error('Error updating order status');
        }
    } catch(error)
    {
        toast.error('Api error', error);
        throw error;
    }
   }

  

   

}