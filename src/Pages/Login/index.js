import React, { Component } from "react";
import ToastComponent from "../../Components/ToastComponent";
import UserService from "../../Services/UserService"
import './style.css';


export default class App extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",

            message: "",

            loading: false,
            isActived: false,
            isConnected: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.isActivedChange = this.isActivedChange.bind(this)
    }

    componentDidMount(){
        document.title = "Fake Store | Login"
        document.getElementById('body').className='bg-gradient-primary'
    }

    componentWillUnmount(){
        document.getElementById('body').className=''
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({loading: true })

        const {username, password} = this.state

        const data = {
            username,
            password
        }

        UserService.login(data)
        .then(res => {
            localStorage.setItem("TOKEN", JSON.stringify(res.data.token));
            localStorage.setItem("USERNAME", JSON.stringify(username));   

            this.setState({
                loading: false,
                message:"Vous êtes connecté(e)",
                isActived: true,
                isConnected: true
            })

            setTimeout(() => {
                window.location.href = '/dashboard';                
            }, 300);
        }).catch(error => {
            this.setState({ 
                loading: false,
                isActived: true,
                isConnected: false,
                message: "Incorrect email and/or password"  
            })
        });
    }

    isActivedChange(){this.setState({isActived: false})}

    render() {

        const {loading, isActived, isConnected, message} = this.state

        return (
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0 ">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>

                                            <form className="user" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <input 
                                                        required
                                                        type="text" 
                                                        className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Username"
                                                        name="username"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <input 
                                                        required
                                                        type="password" 
                                                        className="form-control form-control-user"
                                                        id="exampleInputPassword" 
                                                        placeholder="Password"
                                                        name="password"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>                                                
                                            
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input 
                                                            type="checkbox" 
                                                            className="custom-control-input" 
                                                            id="customCheck"
                                                        />

                                                        <label 
                                                            className="custom-control-label" 
                                                            for="customCheck"
                                                        >
                                                            Remember Me
                                                        </label>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-user btn-block btnBg"
                                                    disabled={loading}
                                                >
                                                    Login

                                                    {loading && 
                                                        <div className="spinner-border text-light" style={{width: '1rem', height: '1rem', marginLeft:8}} role="status">
                                                            <span className="visually-hidden"></span>
                                                        </div>
                                                    }
                                                </button>

                                                {/* 
                                                    <hr/>

                                                    <a href="#" className="btn btn-google btn-user btn-block" >
                                                        <i className="fab fa-google fa-fw"></i> Login with Google
                                                    </a>

                                                    <a href="#" className="btn btn-facebook btn-user btn-block">
                                                        <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                    </a>  
                                                */}
                                            </form>

                                            {/* 
                                                <hr/>

                                                <div className="text-center">
                                                    <a className="small" href="#">Forgot Password?</a>
                                                </div>

                                                <div className="text-center">
                                                    <a className="small" href="#">Create an Account!</a>
                                                </div> 
                                            */}
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div> 

                {isActived && <ToastComponent isActived={isActived} isConnected={isConnected} message={message} onChange={this.isActivedChange} />}
            </div>              
        )
    }

}