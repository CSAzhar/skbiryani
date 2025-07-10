import axios from "axios";
import { toast } from "react-toastify";

export default class AuthService{

    static BASE_URL_AUTH = 'http://localhost:8002/skb/user/';

    static  async  registerUser(formData){
        try{
            const response = await axios.post(`${this.BASE_URL_AUTH}create-user`, formData);
        if(response.status === 200){
            return response.data;
        }else{
            toast.error('Registration Failed');
        }
        }catch(error)
        {
            toast.error('Registration Failed');
        }
        
    }

    static  async  logInUser(formData){
        try{
            const response = await axios.post(`${this.BASE_URL_AUTH}login-email`, formData);
        if(response.status === 200){
            return response.data;
        }else{
            toast.error('Login Failed');
        }
        }catch(error)
        {
            toast.error('Login Failed');
        }
        
    }

}


