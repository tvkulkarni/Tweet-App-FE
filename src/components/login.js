import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        navigate("/register");
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            if (username !== '' && password !== '') {
                AuthService.login(username, password).then(response => {
                    console.log(response.loginStatus);

                    if (response.loginStatus === 'login-success') {
                        navigate("/home");
                        window.location.reload();
                    }
                    else {
                        setMessage("Unable to Login..!");
                        setLoading(false);
                    }

                });
                // }).catch(error=>{
                //     // const resMessage =
                //     //         (error.response &&
                //     //             error.response.data &&
                //     //             error.response.data.message) ||
                //     //         error.message ||
                //     //         error.toString();
                //         console.log(error);
                //         setMessage("Unable to Login..!");
                //         setLoading(false);


                // });    
            }
        }
        else {
            setLoading(false);
        }
    };

    

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#" style={{ margin: "0 auto" }}><strong>&nbsp;Tweet App</strong></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ position: "absolute", right: "10px" }}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" style={{ color: "white" }}>About Us</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
            </nav>
            <br></br>

            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="https://thumbs.dreamstime.com/b/flat-male-avatar-image-beard-hairstyle-businessman-profile-icon-vector-179285629.jpg"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form onSubmit={handleLogin} ref={form}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>

                            <span style={{float:"right"}}>
                                <button className="btn btn-success" disabled={loading} onClick={handleRegister}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Register</span>
                                </button>
                            </span>

                        </div>


                        <br />
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>

                </div>
            </div>
        </div>

    );


};

export default Login;