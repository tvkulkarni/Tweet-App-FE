export default function authHeader()
{
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    //console.log(token);
    if(user && token)
    {
        return token;
    }
    else
    {
        return {};
    }
}