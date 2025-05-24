import React, { Component, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import AuthService from "../services/auth.service";
import 'font-awesome/css/font-awesome.min.css';

const Home = () => {

    let navigate = useNavigate();
    let userData = JSON.parse(localStorage.getItem("user"));
    let name = userData.user.fName;
    let uName = userData.user.userName;

    const [tweetBox, setTweetBox] = useState("");

    const [allTweets, setallTweets] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTweets();
    }, []);

    const fetchTweets = async () => {
        setLoading(true);
        try {
            const response = await AuthService.getAllTweets();
            console.log(response.data);
            const sortedTweets = response.data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
            setallTweets(sortedTweets);
        }
        catch(error) {
            console.error("Failed to fetch tweets:", error);
        } finally{
            setLoading(false);
        }
    }

    const onChangeTweetBox = (e) => {
        const tweetBox = e.target.value;
        setTweetBox(tweetBox);
    };

    const handleLogout = (e) => {
        AuthService.logout();
        navigate("/");
    };

    const handleAddTweet = async (e) => {
        //e.preventDefault();
        alert("Inside Add Tweet");
        
        if(tweetBox!=='')
        {
            console.log(uName);
            const newTweet = await AuthService.addTweet(uName, tweetBox, 1, "#myFirstTweet");
            fetchTweets();
            setTweetBox(""); 
        }
        else
        {
            alert("Please enter something to Post Tweet..!");
        }
    }
    const handleSearchUser = (e) => {
        navigate("/search");
    }
    const handleDeleteTweet = (uname,tweetId) => {
        console.log("Inside handleDeleteTweet");
        if(window.confirm("Are you sure you want to delete this tweet..?"))
        {
            AuthService.deleteTweetById(uname,tweetId).then(response => {
                console.log(response.data);
                alert(response.data);
                setallTweets(prevTweets => prevTweets.filter(tweet => tweet.id !== tweetId));
            })
        }        
    }
    
    const handleViewTweet = (tweetDetails) => {
        console.log(tweetDetails);
        localStorage.setItem("tweetId",JSON.stringify(tweetDetails.id));
        navigate("/tweet");
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
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#" style={{ color: "white" }} onClick={handleSearchUser}>Search User</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#" style={{ color: "white" }} onClick={handleAbout}>About Us</a>
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
            <div className="row">
                <div className="col-lg-4">

                    <div className="card card-container" id="homeCard">
                        <img
                            src="https://thumbs.dreamstime.com/b/flat-male-avatar-image-beard-hairstyle-businessman-profile-icon-vector-179285629.jpg"
                            alt="profile-img"
                            className="profile-img-card"
                        />

                        <b>Greetings, {name} </b>
                        <br />

                        
                            <textarea className="form-control" name="tweetBox" 
                            value={tweetBox} id="textarea" onChange={onChangeTweetBox}
                            rows="3" placeholder="Hey There, What's Happening...?"></textarea>
                            <br />
                            <button className="btn btn-primary" onClick={handleAddTweet}>
                                <span>Post Tweet</span>
                            </button>
                        

                    </div>


                </div>
                <div className="col-lg-5" style={{width:"60%"}}>
                    <div className="card">
                        <center><h3><b>All Tweets</b></h3></center>
                        <table className="table" style={{ borderColor: "#0d6efd",padding:"2px"}}>
                            <thead style={{ backgroundColor: "#0d6efd", color: "white" }}>
                                <tr className="bg-success">
                                    <th scope="col" style={{width:"2%"}}>#</th>
                                    <th scope="col" style={{width:"50%"}}>Tweet</th>
                                    <th scope="col" style={{width:"12%"}}>Post Date</th>
                                    <th scope="col" style={{width:"4%"}}>Likes</th>
                                    <th scope="col" style={{width:"10%"}}>Posted By</th>
                                    <th scope="col" style={{width:"15%"}}>Action</th>
                                    <th scope="col" style={{width:"5%"}}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTweets.map((tweet, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{tweet.tweetName}</td>
                                            <td>{tweet.postDate}</td>
                                            <td>{tweet.likes}</td>
                                            <td>{tweet.user.userName}</td>
                                            <td>
                                                <button className="btn btn-success btn-sm" onClick={()=>{handleViewTweet(allTweets[index])}}>
                                                    <span>View Tweet</span>
                                                </button>
                                            </td>
                                            <td>
                                                <center>
                                                    <i class="fa fa-trash fa-2x text-danger" aria-hidden="true"
                                                     onClick={()=>{handleDeleteTweet(tweet.user.userName,tweet.id)}}>
                                                     </i>
                                                </center>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>


    );
};


export default Home;