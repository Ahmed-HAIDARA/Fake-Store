import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';  
import "./style.css"

export default class Sidebar extends Component {  

    constructor(props) {
        super(props)
        this.state = {
            selecter: '',
        }
    }

    componentDidMount(){
        this.setUrl(window.location.pathname)
    }
    
    setUrl(item) {
        this.setState({selecter: item})
    }

    render() {

        const {selecter} = this.state

        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                    <div className="sidebar-brand-icon rotate-n-0 logo">
                        <img src="https://fakestoreapi.com/icons/logo.png" />
                    </div>
                    <div className="sidebar-brand-text mx-3">Fake Store</div>
                </a>

                {/* Divider */}
                <hr className="sidebar-divider my-0"/>

                {/* Nav Item - Dashboard */}
                <li className={selecter === "/dashboard" ? "nav-item active" : "nav-item"}>
                    <Link to="/dashboard"  className="nav-link" onClick={() => this.setUrl("/dashboard")}  style={{textDecoration: 'none'}}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                {/* Divider */}
                <hr className="sidebar-divider"/>

                {/* Heading  */}
                <div className="sidebar-heading">
                    Interface
                </div>

                {/* Nav Item - Products */}
                <li className={selecter === "/products" ? "nav-item active" : "nav-item"}>
                    <Link to="/products"  className="nav-link" onClick={() => this.setUrl("/products")}  style={{textDecoration: 'none'}}>
                        <i class="fas fa-box-open"></i>
                        <span>Produits</span>
                    </Link>
                </li>
            </ul>
        )
    }

}