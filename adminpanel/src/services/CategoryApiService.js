import axios from "axios";
import { toast } from "react-toastify";



export default class CategoryApiService{

   static BASE_URL = 'http://localhost:8002/skb/category/';

   static async addCategory(formData){
    try {
        const response = await axios.post(this.BASE_URL, formData,{
            headers: {
            'Content-Type': 'multipart/form-data'
        }
    } );
        return response.data;
      } catch (error) {
        console.error("Error while adding food:", error);
        throw error;
      }
   }

   static async getAllCategory(){
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

   static async deleteCategoryById(foodId){
        try {
            const response = await axios.delete(`${this.BASE_URL}${foodId}`);
            if(response.status===200){
                return response.data;
            }else{
                toast.error('Deletion failed');
            }
        } catch (error) {
            toast.error('Api error', error);
            throw error;
        }
   }

}