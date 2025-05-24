import axios from "axios";
import authHeader from "./auth-header";
//http://tweetapptvk-env.eba-fuv2kikt.ap-northeast-1.elasticbeanstalk.com/
//"http://localhost:9080/app/v1.0/tweets"
//"http://tweetapptvk-env.eba-fuv2kikt.ap-northeast-1.elasticbeanstalk.com/app/v1.0/tweets"
const API_URL = "http://localhost:5000/app/v1.0/tweets";

let AUTH_TOKEN =
{
    "Authorization": authHeader()
};


const login = (userName, pwd) => {
    return axios.post(API_URL + "/login",
        {
            userName, pwd
        })
        .then(response => {

            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }
            return response.data;
        });
}

const logout = () => {
    localStorage.clear();
}

const register = (userName, pwd, email, fName, lName, contactNumber) => {
    console.log(userName, pwd, email, fName, lName, contactNumber);
    return axios.post(API_URL + "/register", {
        userName, pwd, email, fName, lName, contactNumber
    });
};

const searchByUsername = (username) => {
    console.log("Inside searchByUsername:" + username);

    console.log(AUTH_TOKEN);
    return axios.get(API_URL + "/user/search/" + username, { headers: AUTH_TOKEN });

};

const getAllTweets = () => {
    console.log("Inside getAllTweets");
    return axios.get(API_URL + "/all", { headers: AUTH_TOKEN });
};

const deleteTweetById = (uname,tweetId) => {
    console.log("Inside deleteTweetById");
    return axios.delete(API_URL + "/" + uname + "/delete/" + tweetId, { headers: AUTH_TOKEN });
}

const addTweet = (userName,tweetName,likes,tweetTag) => {
    console.log("Inside addTweet");
    console.log(userName,tweetName,likes,tweetTag);
    return axios.post(API_URL + "/" + userName + "/add", {
        tweetName,likes,tweetTag}, {
        headers: AUTH_TOKEN 
    });
}

const likeTweetById = (username,id) => {
    console.log("Inside likeTweetById");
    return axios.put(API_URL + "/" + username + "/like/" + id,null,{headers:AUTH_TOKEN});
}

const getTweetById = (id) => {
    return axios.get(API_URL + "/getTweetById/" + id, {headers:AUTH_TOKEN});
}

const replyById = (username,id,reply) => {
    return axios.post(API_URL + "/" +username+ "/reply/" + id,{"tweetReply":reply},{headers:AUTH_TOKEN});
}

const editTweetById = (username,id,editBox) => {
    return axios.put(API_URL + "/" +username+ "/update/" + id,{"tweetName":editBox},{headers:AUTH_TOKEN});
}

const AuthService =
{
    login,
    logout,
    register,
    searchByUsername,
    getAllTweets,
    deleteTweetById,
    addTweet,
    likeTweetById,
    getTweetById,
    replyById,
    editTweetById
};


export default AuthService;