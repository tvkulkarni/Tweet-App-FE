import { React } from 'react';
import { useNavigate } from 'react-router';
import AuthService from '../services/auth.service';

const About = () => {

    const navigate = useNavigate();

    const handleHome = (e) => {
        navigate("/home");
    };

    const handleLogout = (e) => {
        AuthService.logout();
        navigate("/");
    };

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

            <div className="row" style={{ margin: "6%" }}>
                <div className="card" style={{ width: "40rem" }}>
                    <center><h4><b style={{color: "#0d6efd" }}>About US</b></h4></center>
                    <center><hr width="75%" style={{ marginTop: "1px", color: "#0d6efd" }}></hr></center>
                    <p className="card-text">
                        <center><h4><b>We serve the public conversation.</b></h4></center>
                        We believe real change starts with conversation. Here you voice matters
                        Come as you are we'll do whats right to serve the public conversation.
                        <br></br>
                    </p>
                </div>
                
            </div>
        </div>
    );
}

export default About;