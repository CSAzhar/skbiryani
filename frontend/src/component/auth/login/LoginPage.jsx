import React, { useContext, useState } from "react";
import './LoginPage.css';
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { toast } from "react-toastify";
import { StoreContext } from "../../../context/StoreContext";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });
    const {setToken} = useContext(StoreContext);
    const navigate = useNavigate();
    const handleOnChange = ((event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    });
    // useEffect(() => {
    //     console.log(formData);
    // })
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const response = await AuthService.logInUser(formData);
        if(response){
            toast.success('Login Successful');
            setToken(response.token);
            localStorage.setItem("token", response.token);
            navigate('/');
        }
    }


    return (
        <div className="outer-div">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Log In</h5>
                                <form onSubmit={handleOnSubmit}> 
                                    
                                    <div className="form-floating mb-3">
                                        <input type="email"
                                                name="email"
                                                className="form-control" 
                                                id="floatingInput" 
                                                placeholder="Enter your Email"
                                                onChange={handleOnChange}
                                                required 
                                        />
                                        <label htmlFor="floatingInput">Email address or Id</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="password" 
                                                name="password"
                                                className="form-control" 
                                                id="floatingPassword" 
                                                placeholder="Password"
                                                onChange={handleOnChange}
                                                required 
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" 
                                                type="submit">Login
                                        </button>
                                    </div>

                                </form>
                                <div className="mt-4">
                                    Register here for login <Link to='/register'>Sign Up</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;