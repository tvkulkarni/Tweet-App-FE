import React, { useRef, useState, Component } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";


const Search = () => {

    let navigate = useNavigate();

    const form = useRef();

    const [searchData, setsearchData] = useState([{}]);
    const [username, setUsername] = useState("");


    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };



    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const handleLogout = (e) => {
        AuthService.logout();
        navigate("/");
    };

    const handleHome = (e) => {
        navigate("/home");
    };


    const handleSearch = (e) => {

        e.preventDefault();
        if (username !== '') {
            AuthService.searchByUsername(username).then(result => {
                console.log(result);
                if (result.status === 200) {
                    console.log("Success");
                    setsearchData(result.data[0]);
                    console.log(searchData);
                    document.getElementById("searchCard").style.display='block';
                }
            }).catch(error => {
                console.log(error.response.status);
            })
        }

    };

    const handleAbout = (e)=>{
        navigate("/about");
    }


    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#" style={{ margin: "0 auto" }}><strong>&nbsp;Tweet App</strong></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div style={{ position: "absolute", left: "10px" }}>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" style={{ color: "white" }} onClick={handleHome}>Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#" style={{ color: "white" }} onClick={handleAbout}>About Us</a>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ position: "absolute", right: "10px" }}>
                    <ul className="navbar-nav mr-auto">


                        <li className="nav-item active">
                            <a className="nav-link" style={{ color: "white" }} onClick={handleLogout}>
                                <img src="https://icon-library.com/images/logout-icon-png/logout-icon-png-3.jpg" width="30" height="30" />
                            </a>
                        </li>
                    </ul>

                </div>
            </nav>
            <br></br><br></br>

            <div className="col-md-12">
                <div className="card card-container">
                    <div className="form-group">
                        <Form ref={form}>
                            <label htmlFor="username">Search Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required]}
                            /><br></br>
                            <button className="btn btn-primary" onClick={handleSearch}>
                                <span>Search</span>
                            </button>
                        </Form>
                    </div>

                </div>
                <div id="searchCard" className="card" style={{ width: "50%", display:"none"}}>
                    <center><h3><b>Search Results</b></h3></center>
                    
                    
                    <table className="table">
                        <thead class="thead-dark" style={{backgroundColor:"#0d6efd",color:"white"}}>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User Name</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                            </tr>
                        </thead>
                        <tbody style={{borderBottomColor:"#0d6efd"}}>
                            <tr>
                                <td>1</td>
                                <td>{searchData.userName}</td>
                                <td>{searchData.fName}</td>
                                <td>{searchData.lName}</td>
                                <td>{searchData.email}</td>
                                <td>{searchData.contactNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

};

export default Search;