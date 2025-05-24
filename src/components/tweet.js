import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import 'font-awesome/css/font-awesome.min.css';

const Tweet = () => {
    let navigate = useNavigate();
    const id = JSON.parse(localStorage.getItem("tweetId"));
    let userData = JSON.parse(localStorage.getItem("user"));
    let uname = userData.user.userName;

    const [replies, setReplies] = useState({});
    const [editBox, setEditBox] = useState("");
    const [tweetData, settweetData] = useState([]);

    useEffect(() => {
        AuthService.getTweetById(id)
            .then(response => {
                settweetData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        navigate("/");
    };

    const handleHome = () => {
        localStorage.removeItem("tweetDetails");
        navigate("/home");
    };

    const handleLike = (username, tweetId) => {
        AuthService.likeTweetById(username, tweetId)
            .then(response => {
                settweetData(prevTweets =>
                    prevTweets.map(tweet =>
                        tweet.id === tweetId
                            ? { ...tweet, likes: tweet.likes + 1 }
                            : tweet
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const onChangeReply = (tweetId, e) => {
        setReplies(prev => ({
            ...prev,
            [tweetId]: e.target.value
        }));
    };

    const handleEnter = (e, tweetId) => {
        if (e.key === 'Enter') {
            const replyText = replies[tweetId];
    
            if (replyText && replyText.trim() !== '') {
                AuthService.replyById(uname, tweetId, replyText)
                    .then(response => {
                        // Add new reply to the existing replies array
                        settweetData(prevTweets =>
                            prevTweets.map(tweet =>
                                tweet.id === tweetId
                                    ? { ...tweet, replies: [...(tweet.replies || []), { tweetReply: replyText }] }
                                    : tweet
                            )
                        );
                        setReplies(prev => ({ ...prev, [tweetId]: '' }));
                    })
                    .catch(error => console.log(error));
            } else {
                alert("Please enter a reply.");
            }
        }
    };
    

    const handleEditBoxEnter = (e) => {
        if (e.key === 'Enter') {
            if (editBox.trim() !== '') {
                AuthService.editTweetById(uname, id, editBox)
                    .then(response => {
                        settweetData(prevTweets =>
                            prevTweets.map(tweet =>
                                tweet.id === id
                                    ? { ...tweet, tweetName: response.data.tweetName }
                                    : tweet
                            )
                        );
                        setEditBox("");
                    })
                    .catch(error => console.log(error));
            } else {
                alert("Please enter text to edit the tweet.");
            }
        }
    };

    const handleEditTweet = () => {
        document.getElementById("editBox").style.display = "block";
    };

    const handleAbout = () => {
        navigate("/about");
    };

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#" style={{ margin: "0 auto" }}>
                    <strong>Tweet App</strong>
                </a>
                <div style={{ position: "absolute", left: "10px" }}>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" onClick={handleHome} style={{ color: "white" }}>
                                Home
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" onClick={handleAbout} style={{ color: "white" }}>
                                About Us
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse" style={{ position: "absolute", right: "10px" }}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" onClick={handleLogout} style={{ color: "white" }}>
                                <img src="https://icon-library.com/images/logout-icon-png/logout-icon-png-3.jpg" width="30" height="30" alt="Logout" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="row" style={{ margin: "6%" }}>
                <div className="card" style={{ width: "28rem" }}>
                    <center><h4><b>Your Tweet Details</b></h4></center>
                    <center><hr width="75%" style={{ marginTop: "1px", color: "#0d6efd" }} /></center>
                    {tweetData.map((x) => (
                        <div key={x.id} className="card-body">
                            <img
                                src="https://thumbs.dreamstime.com/b/flat-male-avatar-image-beard-hairstyle-businessman-profile-icon-vector-179285629.jpg"
                                alt="profile-img"
                                className="img-card-tweeet"
                            />
                            <h5 className="card-title">{x.user.fName + " " + x.user.lName}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">@{x.user.userName}</h6>
                            <p className="card-text" style={{ fontSize: "22px", marginBottom: "2px" }}>
                                {x.tweetName}
                            </p>
                            <p className="card-text" style={{ color: "#0d6efd" }}>
                                {x.tweetTag}
                            </p>

                            <p>
                                <i
                                    className="fa fa-heart text-danger"
                                    aria-hidden="true"
                                    style={{ fontSize: "25px", cursor: "pointer" }}
                                    onClick={() => handleLike(x.user.userName, x.id)}
                                ></i>
                                <span style={{ fontSize: "24px" }}>{x.likes}</span>
                            </p>

                            <b>Comments</b>
                            <hr />
                            {x.replies === null ? (
                                <span>No Comments to display</span>
                            ) : (
                                x.replies.map((reply) => (
                                    <p key={reply.id}>- {reply.tweetReply}</p>
                                ))
                            )}

                            <input
                                className="form-control"
                                placeholder="Your Comment goes Here"
                                style={{ width: "70%", height: "8%" }}
                                type="text"
                                value={replies[x.id] || ''}
                                onChange={(e) => onChangeReply(x.id, e)}
                                onKeyDown={(e) => handleEnter(e, x.id)}
                            />
                        </div>
                    ))}

                    <button className="btn btn-success btn-sm" onClick={handleEditTweet} style={{ width: "20%", marginLeft: "15px" }}>
                        Edit Tweet
                    </button>
                    <br />
                    <input
                        className="form-control"
                        id="editBox"
                        placeholder="Edit your Tweet"
                        style={{ display: "none", width: "70%", height: "80%", marginLeft: "15px" }}
                        type="text"
                        value={editBox}
                        onChange={(e) => setEditBox(e.target.value)}
                        onKeyDown={handleEditBoxEnter}
                    />
                </div>
            </div>
        </div>
    );
};

export default Tweet;
