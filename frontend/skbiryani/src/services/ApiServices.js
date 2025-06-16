import axios from "axios";
import { toast } from "react-toastify";

export default class ApiService{

    static BASE_URL = 'http://localhost:8002/skb/food/';

    static async getAllFood(){
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

}