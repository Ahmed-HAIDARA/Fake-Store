import React, { Component } from "react";
import ToastComponent from "../../Components/ToastComponent";
import ProductService from "../../Services/ProductService"
import CartService from "../../Services/CartService"
import UserService from "../../Services/UserService";
import { Chart } from "react-google-charts";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';

export default class Dashboard extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            categories: [],
            carts: [],
            users: [],

            loading: true,
            isActived: false,
            isConnected: false,            
        }
    }

    componentDidMount(){
        document.title = "Fake Store | Dashboard" 
        this.getProducts()
        this.getProductsCategories()
        this.getCarts()
        this.getUsers()
    }

    getProducts(){
        ProductService.getAll()
        .then(response => {            
            this.setState({ 
                products: response.data,
            });            
        }).catch(error => {
            this.setState({ 
                isActived: true,
                isConnected: false,
                message: "An unexpected error has occurred"  
            });
        }); 
    }

    getProductsCategories(){
        ProductService.getAllCategories()
        .then(response => {            
            this.setState({ 
                categories: response.data,
            });
        }).catch(error => {
            this.setState({ 
                isActived: true,
                isConnected: false,
                message: "An unexpected error has occurred"  
            });
        });
    }

    getCarts(){
        CartService.getAll()
        .then(response => {            
            this.setState({ 
                carts: response.data,
            });
        }).catch(error => {
            this.setState({ 
                isActived: true,
                isConnected: false,
                message: "An unexpected error has occurred"  
            });
        });
    }

    getUsers(){
        UserService.getAll()
        .then(response => {            
            this.setState({ 
                users: response.data,
                loading: false,
            });
        }).catch(error => {
            this.setState({ 
                isActived: true,
                isConnected: false,
                message: "An unexpected error has occurred"  
            });
        });
    }

    render() {

        const {
            products,
            categories,
            carts,
            users,
            loading,
            isActived, 
            isConnected, 
            message
        } = this.state

        const dataForProduct = () => {
            let item = [["Poduct", "price"],]   
            
            // Array of all product title with it own price
            products.map((answer) => {
                let title = answer.title
                let price = answer.price
                let a = [title, price]
                item = item.concat([a],)
            })

            return item
        } 

        const optionForProduct = {
            chart: {
                title: "Product by price",
                colors: ["#802c6e"],
                subtitle: "Title, price",
            }
        }

        const dataForCategories = () => {
            let item = [["Categories", "Price"],]                   

            // Array of all price from same category
            categories.map((answer) => {
                let product = products.filter(c => c["category"] === answer)
                let price = 0
                product.map((elem) => {
                    price = price + elem.price
                })
                let a = [answer[0].toUpperCase() + answer.slice(1).toLowerCase(), price]
                item = item.concat([a],)
            })

            return item
        } 

        const optionForCategories = {
            title: "Products price by categories",
            pieHole: 0.5,
            is3D: false,
        };

        const dataForCarts = () => {
            let item = [["date", "sales"],] 

            // Find all carts from same date
            let SameDateCart = carts.filter( (ele, ind) => ind === carts.findIndex( elem => elem.date === ele.date))

            // Sort them carts from same date
            SameDateCart = SameDateCart.sort(function(a,b){
                return a.date < b.date ? -1 : 1;
            });

            //For carts to same date find products price and quantity
            SameDateCart.map((answer) => {
                // carts from specify date
                let CartOfday = carts.filter(c => c["date"] === answer.date)
                let productsOfCart = []
                let price = 0
                // Get price for daily saling
                CartOfday.map((element) => {
                    productsOfCart = element.products
                    productsOfCart.map((item) => {
                        let productPrice = products.filter(c => c["id"] === item.productId)[0].price
                        price = price + (productPrice * item.quantity)

                    })   
                })
                let a = [new Date(answer.date).toLocaleDateString(), price]
                item = item.concat([a],)
            })

            return item
        }
          
        const optionsForCarts = {
            title: "Products saling Performance",
            curveType: "function",
            legend: { position: "bottom" },
        };
        
        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>

                {/* First line Content Row */}
                <div className="row">
                    {/* Products Card  */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-color shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-bg text-uppercase mb-1">
                                            Products
                                        </div>

                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{products.length.toLocaleString()}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-box-open fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories card */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-color shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-bg text-uppercase mb-1">
                                            Categories
                                        </div>

                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{categories.length.toLocaleString()}</div>
                                    </div>

                                    <div className="col-auto">
                                        <i className="fas fa-layer-group fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Carts card */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-color shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-bg text-uppercase mb-1">
                                            Carts
                                        </div>

                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{carts.length.toLocaleString()}</div>
                                    </div>

                                    <div className="col-auto">
                                        <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User card */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-color shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-bg text-uppercase mb-1">
                                            Users
                                        </div>

                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{users.length.toLocaleString()}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-users fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* First line Content Row */}

                {/* Products by price */}
                <div className="row">
                    <div className="col-xl-12">
                        {/* Products Bar Chart  */}
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="chart-bar">
                                    <Chart
                                        chartType="Bar"
                                        width="100%"
                                        height="260px"
                                        data={dataForProduct()}
                                        options={optionForProduct}
                                    />  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Products by price */}

                {/* Products by category */}
                <div className="row">
                    <div className="col-xl-4 col-lg-5">
                        {/* Products PieChart  */}
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="chart-bar">
                                    <Chart
                                        chartType="PieChart"
                                        data={dataForCategories()}
                                        options={optionForCategories}
                                        width={"100%"}
                                        height="260px"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8 col-lg-7">
                        {/* Products PieChart  */}
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="chart-bar">
                                    <Chart
                                        chartType="LineChart"
                                        width="100%"
                                        height="260px"
                                        data={dataForCarts()}
                                        options={optionsForCarts}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Products by category */}

                {isActived && <ToastComponent isActived={isActived} isConnected={isConnected} message={message} onChange={this.isActivedChange} />}
            
                <Backdrop sx={{ color: '#802c6e', zIndex: (theme) => theme.zIndex.drawer + 1000 }} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>    
            </div>              
        )
    }

}