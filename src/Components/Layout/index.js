import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';  
import Sidebar from "../Sidebar"
import Topbar from '../Topbar'
import LogoutModal from '../LogoutModal'

import Products from "../../Pages/Products";
import Dashboard from "../../Pages/Dashboard"

export default class Layout extends Component { 

    componentDidMount(){
        document.title = "Fake Store | Login"
        document.getElementById('body').id='page-top'
    }

    componentWillUnmount(){
        document.getElementById('page-top').id='body'
    }

    render() {

        return (
            <BrowserRouter >
                {/* Page Wrapper  */}
                <div id="wrapper">
                    {/* Sidebar */}
                    <Sidebar />
                    {/* En Sidebar */}

                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            {/* Topbar */}
                            <Topbar />
                            {/* End of Topbar */}

                            {/* Begin Page Content */}
                            <Routes>
                                <Route 
                                    path="dashboard" 
                                    element={<Dashboard />} 
                                /> 

                                <Route 
                                    path="products" 
                                    element={<Products />} 
                                /> 
                            </Routes>
                        </div>
                        {/* End of Main Content */}

                        {/* Footer  */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Fake Store 2024</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                    {/* End of Content Wrapper */}                
                </div>
                {/* End of Page Wrapper */}

                {/* Scroll to Top Button */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
                {/* End Scroll to Top Button */}

                {/* Logout Modal */}
                <LogoutModal />
                {/* End Logout Modal */}
            </BrowserRouter>
        )

    }
}
