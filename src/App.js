import React, { Component } from "react";
import Layout from './Components/Layout'
import Login from './Pages/Login'

export default class App extends Component { 

    render() {

        if (window.location.pathname !== "/") {
            return <Layout />
        } else {
            return <Login />
        }
    
    }

}
