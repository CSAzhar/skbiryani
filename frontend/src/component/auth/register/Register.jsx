import React, { useState } from "react";
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { toast } from "react-toastify";

const Register = () => {

    const[data, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
        
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const response = await AuthService.registerUser(data);
        if(response){
            toast.success('Registered');
            console.log(response);
            navigate("/login");
        }
    }

    return (
        <div className="outer-div">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
                                <form onSubmit={onSubmitHandler}>
                                    <div className="form-floating mb-3">
                                        <input type="text" 
                                        className="form-control" 
                                        id="floatingName"
                                        placeholder="name@example.com" 
                                        name="name"
                                        onChange={onChangeHandler}
                                        value={data.name}
                                        required/>
                                        <label htmlFor="floatingNamet">Full Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" 
                                        className="form-control" 
                                        id="floatingInput" 
                                        placeholder="name@example.com"
                                        onChange={onChangeHandler}
                                        name="email"
                                        value={data.email}
                                        required />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="tel" 
                                        className="form-control" 
                                        id="floatingMobile" 
                                        placeholder="name@example.com"
                                        pattern="[0-9]{10}" maxLength="10" minLength="10"
                                        requiredPlaceholder="Enter 10-digit number" 
                                        onChange={onChangeHandler}
                                        name="mobile"
                                        value={data.mobile}
                                        required
                                        oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);"
                                        />
                                        <label htmlFor="floatingNamet">Mobile</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" 
                                        className="form-control" 
                                        id="floatingPassword" 
                                        placeholder="Password"
                                        onChange={onChangeHandler}
                                        name="password"
                                        value={data.password}
                                        required />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    
                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                            up</button>
                                    </div>
                                    {/* <hr className="my-4" />
                                    <div className="d-grid mb-2">
                                        <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                                            <i className="fab fa-google me-2"></i> Sign in with Google
                                        </button>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-facebook btn-login text-uppercase fw-bold" type="submit">
                                            <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                                        </button>
                                    </div> */}
                                </form>
                                <div className="mt-4">
                                    Already registered? <Link to='/login'>Log in</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;