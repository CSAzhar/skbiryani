import axios from "axios";
import { toast } from "react-toastify";



export default class LiveFoodApi{

   static BASE_URL = 'http://localhost:8002/skb/food/livefoods';


   static async getLiveFoods(){
    try{
        const response = await axios.get(this.BASE_URL);
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

   static async toggleFoodItem(foodId){
    try{
        const response = await axios.post(`${this.BASE_URL}/${foodId}`);
        if(response.status === 200){
            return response.data;
        }else{
            toast.error('Error toggle food');
        }
    } catch(error)
    {
        toast.error('Api error', error);
        throw error;
    }
    
   }

   

}