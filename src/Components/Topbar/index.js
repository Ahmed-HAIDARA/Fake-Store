import React, { Component } from "react";
import "./style.css"
import profile from "../../Assets/undraw_profile.svg"

export default class Topbar extends Component { 
    
    constructor(props) {
        super(props)
        this.state = {
            name: "",
        }
    }

    componentDidMount() {
        const name = JSON.parse(localStorage.getItem("USERNAME"))
        if (name === null) {
            window.location.href = '/';
        } else {
            this.setState({name: name  });
        }
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    } 

    render() {

        const {name} = this.state

        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                    {/* Nav Item - User Information */}
                    <li className="nav-item dropdown no-arrow">
                        <a 
                            className="nav-link dropdown-toggle" 
                            href="#" 
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{name}</span>
                            <img className="img-profile rounded-circle" src={profile} />
                        </a>

                        {/* Dropdown - User Information  */}
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a 
                                className="dropdown-item" 
                                href="#" 
                                onClick={() => this.logout()}
                                data-toggle="modal" 
                                data-target="#logoutModal"
                            >
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li> 
                </ul>
            </nav>
        )
    }

}