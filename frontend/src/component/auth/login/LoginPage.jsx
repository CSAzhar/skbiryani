import React from "react";
import './LoginPage.css';
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="outer-div">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Log In</h5>
                                <form>
                                    <div className="form-floating mb-3">
                                        <onInput type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        required />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <onInput type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                        required />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    {/* <div className="form-check mb-3">
                                    <onInput className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                            Remember password
                                        </label>
                                </div> */}
                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Log
                                            in</button>
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