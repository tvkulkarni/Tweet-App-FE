import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

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

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const vfname = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                First Name must be between 3 and 20.
            </div>
        );
    }
};

const vlname = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Last Name must be between 3 and 20.
            </div>
        );
    }
};

const vcontact = (value) => {
    if (value.length < 10) {
        return (
            <div className="alert alert-danger" role="alert">
                Contact must be 10 characters.
            </div>
        );
    }
};

const Register = () => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    const [userName, setUsername] = useState("");
    const [pwd, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [contactNumber, setContact] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
    };

    const onChangeFname = (e) => {
        const fName = e.target.value;
        setFname(fName);
    };

    const onChangeLname = (e) => {
        const lName = e.target.value;
        setLname(lName);
    };

    const onChangeContact = (e) => {
        const contact = e.target.value;
        setContact(contact);
    };


    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(userName, pwd, email, fName, lName, contactNumber).then(
                (response) => {
                    console.log(response.status)
                    if (response.status === 201) {
                        console.log("User Created");
                        setMessage("User Registered Successfully...!");
                        setSuccessful(true);
                        navigate("/");
                    }

                }).catch(err => {
                    console.log("Error During Register:" + err);
                    setMessage("User Exist");
                    setSuccessful(false);

                })
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>


                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={userName}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={pwd}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fname">First Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="fname"
                                    value={fName}
                                    onChange={onChangeFname}
                                    validations={[required, vfname]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lname">Last Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lname"
                                    value={lName}
                                    onChange={onChangeLname}
                                    validations={[required, vlname]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact">Contact</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="contact"
                                    value={contactNumber}
                                    onChange={onChangeContact}
                                    validations={[required, vcontact]}
                                />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>

    );
}

export default Register;