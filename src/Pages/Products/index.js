import React, { Component } from "react";
import ToastComponent from "../../Components/ToastComponent";
import ProductService from "../../Services/ProductService"
import { DataGrid, GridToolbarFilterButton } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';
import { Modal } from 'react-bootstrap';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'


export default class Products extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            categories: [],
            product: {},
            
            message: "",

            addProduct: false,
            editProduct: false,
            openModal: false,

            categorySelected: "",
            id_product: null,
            title: "",
            price: 0,
            image: "",
            category: "",
            description: "",

            loading: true,
            isActived: false,
            isConnected: false,

            anchorEl: [],    
            anchorElFilter: null        
        }
        this.handleClick = this.handleClick.bind(this)
        this.isActivedChange = this.isActivedChange.bind(this)
        this.handleClickFilter = this.handleClickFilter.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
    }

    componentDidMount(){
        document.title = "Fake Store | Products" 
        ProductService.getAll()
        .then(response => {            
            this.setState({ 
                products: response.data,
            });
            this.getProductsCategories()
        }).catch(error => {
            this.setState({ 
                loading: false,
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
                category: response.data[0],
                loading: false,
            });
        }).catch(error => {
            this.setState({ 
                loading: false,
                isActived: true,
                isConnected: false,
                message: "An unexpected error has occurred"  
            });
        });
    }

    handleClick(id, event){       
        let { anchorEl } = this.state
        anchorEl[id] = event.target;
        this.setState({ anchorEl });
    }

    handleClickFilter(event){
        this.setState({anchorElFilter: event.currentTarget})
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    selectCategory(item){
        this.setState({categorySelected: item, anchorElFilter: null})
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({loading: true })

        const {title, price, image, category, description} = this.state

        const data = {
            title,
            price,
            description,
            image,
            category
        }

        ProductService.create(data)
        .then(res => {
            this.setState({
                title: "",
                price: 0,
                image: "",
                category: "",
                description: "",
                addProduct: false,
                loading: false,
                message:"Product added successfully",
                isActived: true,
                isConnected: true
            })
            this.componentDidMount()
        }).catch(error => {
            console.log('error', error)
            this.setState({ 
                loading: false,
                isActived: true,
                isConnected: false,
                message: "An unexpected error has occurred"   
            })
        });
    }

    handleSubmitEdit(event){
        event.preventDefault();
        this.setState({loading: true })

        const {title, price, image, category, description} = this.state

        const data = {
            title,
            price,
            description,
            image,
            category
        }

        ProductService.update(this.state.id_product, data)
        .then(res => {
            this.setState({
                title: "",
                price: 0,
                image: "",
                category: "",
                description: "",
                editProduct: false,
                loading: false,
                message:"Product updated successfully",
                isActived: true,
                isConnected: true
            })
            this.componentDidMount()
        }).catch(error => {
            console.log('error', error)
            this.setState({ 
                loading: false,
                isActived: true,
                isConnected: false,
                message: "An unexpected error has occurred"   
            })
        });
    }

    isActivedChange(){this.setState({isActived: false})}

    show(id){
        this.setState({ loading: true, anchorEl: []});

        ProductService.get(id)
        .then(response => {            
            this.setState({ 
                product: response.data,
                loading: false,
                openModal: true
            });
        }).catch(error => {
            this.setState({ 
                loading: false,
                isActived: true,
                isConnected: false,
                message: "An unexpected error has occurred"  
            });
        });

    }

    edit(id){
        this.setState({loading: true, anchorEl: []})  
        const item = this.state.products.filter(c => c["id"] === id)[0]
        this.setState({
            id_product: id,
            title: item.title,
            price: item.price,            
            image: item.image,
            category: item.category,
            description: item.description,
            loading: false,
            editProduct: true
        })
    }

    delete(id){
        this.setState({loading: true, anchorEl: []})  

        ProductService.remove(id)
        .then(res => {
            this.setState({
                loading: false,
                message:"Product deleted successfully",
                isActived: true,
                isConnected: true
            })
            this.componentDidMount()
        }).catch(error => {
            console.log('error', error)
            this.setState({ 
                loading: false,
                isActived: true,
                isConnected: false,
                message: "An unexpected error has occurred"   
            })
        });
    }    

    render() {

        const {
            products, 
            categories,
            product, 
            loading, 
            addProduct,
            editProduct,
            openModal, 
            categorySelected,
            title,
            price,
            image,
            category,
            description,
            isActived, 
            isConnected, 
            message,
            anchorEl,
            anchorElFilter
        } = this.state

        const column = [
            { 
                field: 'image', 
                headerName: 'Preview',
                width: 80,
                renderCell: (cellValues) => { return <img src={cellValues.row.image} width={24} /> }
            },
            { 
                field: 'title', 
                headerName: 'Title',
                flex: 1,
            },
            { 
                field: 'category', 
                headerName: 'Category',
                flex: 1/2,
                renderCell: (cellValues) => { return cellValues.row.category[0].toUpperCase() + cellValues.row.category.slice(1).toLowerCase() }
            },
            { 
                field: 'price', 
                headerName: 'Price',
                flex: 1/3,
            },
            { 
                field: 'rate', 
                headerName: 'Rate',
                flex: 1/4,
                renderCell: (cellValues) => { return cellValues.row.rating.rate.toLocaleString() }
            },
            { 
                field: 'actions', 
                headerName: 'Actions',
                width: 100,
                headerAlign: 'center',
                align:'center',
                renderCell: (cellValues) => {
                    return (
                        <React.Fragment>
                            <IconButton onClick={e => this.handleClick(cellValues.row.id, e)}>
                                <MoreVertIcon />
                            </IconButton>

                            <Menu                                                            
                                id={cellValues.row.id}
                                anchorEl={anchorEl[cellValues.row.id]}
                                keepMounted
                                open={Boolean(anchorEl[cellValues.row.id])}
                                onClose={() => this.setState({anchorEl: []})}    
                                PaperProps={{
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 0,
                                        ml:1,
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem  onClick={() => { this.show(cellValues.row.id) }}>
                                    <ListItemIcon><RemoveRedEyeIcon fontSize="small" /></ListItemIcon>Details
                                </MenuItem>

                                <MenuItem  onClick={() => { this.edit(cellValues.row.id) }}>
                                    <ListItemIcon><ModeIcon fontSize="small" /></ListItemIcon>Modifier
                                </MenuItem>

                                <MenuItem onClick={() => {if(window.confirm('Êtes-vous sûr de le supprimer ?')){this.delete(cellValues.row.id)}}} style={{color:"red"}}>
                                    <ListItemIcon><DeleteIcon fontSize="small" style={{color:"red"}} /></ListItemIcon>Supprimer
                                </MenuItem>  
                            </Menu>
                        </React.Fragment>
                    )
                }
            }
        ]

        function Toolbar() {
            return (
              <div>
                    <GridToolbarFilterButton />
              </div>
            );
        }

        let DataProducts=[]
        if(categorySelected === ""){
            DataProducts = products
        }else{
            DataProducts = products.filter(c => c["category"] === categorySelected)
        }
        
        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Products</h1>

                    <div>
                        <a 
                            href="#" 
                            className="d-none d-md-inline-block btn btn-md btn-primary shadow-sm btnBg"
                            onClick={() => this.setState({addProduct: true})}
                        >
                            Add new product
                        </a>

                        <a 
                            href="#" 
                            onClick={this.handleClickFilter}
                            className="d-none d-md-inline-block btn btn-md btn-primary shadow-sm btnBg ml-4"
                        >
                            Filter by category
                        </a>  

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorElFilter}
                            open={Boolean(anchorElFilter)}
                            onClose={() => {this.setState({ anchorElFilter: null})}}
                            PaperProps={{
                                sx: {
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 2,
                                    ml: -2
                                }
                            }}
                        >
                            <MenuItem 
                                onClick={() =>this.selectCategory("")} 
                                sx={categorySelected === "" ? {color:'#802c6e'} : null}
                            >
                                All categories
                            </MenuItem>

                            {categories.map((elem) => (
                                <MenuItem 
                                    onClick={() => this.selectCategory(elem)} 
                                    sx={categorySelected === elem ? {color:'#802c6e'} : null}
                                >
                                    {elem[0].toUpperCase() + elem.slice(1).toLowerCase()}
                                </MenuItem>
                            ))}
                        </Menu>  
                    </div>                    
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="card shadow" style={{height: 665}}>
                        <DataGrid
                            rows={DataProducts}
                            columns={column}
                            elevation={10}
                            slots={{
                                toolbar: Toolbar,
                            }}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'title', sort: 'asc' }],
                                },
                                pagination: { paginationModel: { pageSize: 10 } },
                              }}
                            sx={{
                                boxShadow: 24,
                                borderRadius:2,
                                '.MuiDataGrid-columnSeparator': {
                                    display: 'none',
                                },
                                '&.MuiDataGrid-root': {
                                    border: 'none',
                                },
                                '.css-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
                                    color:'black',
                                    fontWeight: 600,
                                    fontSize: 18
                                }
                            }}
                            localeText={{
                                noRowsLabel: <img style={{width:200}} src="https://static.vecteezy.com/system/resources/previews/011/537/764/original/find-folder-empty-state-single-isolated-icon-with-flat-style-free-vector.jpg" />,
                                MuiTablePagination: {labelRowsPerPage: 'Ligne par page'}
                            }}
                            pageSizeOptions={[5, 10, 20]}
                        />

                        </div>
                    </div>
                </div>

                <Modal show={addProduct} onHide={() => this.setState({addProduct: false})} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add new product</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product title</label>

                                    <input 
                                        required
                                        type="text" 
                                        className="form-control"
                                        name="title"
                                        value={title}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product price</label>

                                    <input
                                        required
                                        type="number" 
                                        className="form-control"
                                        name="price"
                                        value={price}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product image url</label>

                                    <input 
                                        required
                                        type="text" 
                                        className="form-control"
                                        name="image"
                                        value={image}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product category</label>

                                    <select 
                                        class="form-select"
                                        name="category"
                                        value={category}
                                        onChange={this.handleChange}
                                    >
                                        {categories.map((item, key) => {
                                            return (<option value={item}>{item[0].toUpperCase() + item.slice(1).toLowerCase()}</option>)
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-12 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product description</label>

                                    <textarea 
                                        required
                                        class="form-control"
                                        rows="4"
                                        name="description"
                                        value={description}
                                        onChange={this.handleChange}
                                    >

                                    </textarea>
                                </div>

                                <div className="col-lg-12 form-group">
                                    <button
                                        type="submit"
                                        class="btn btn-google btn-block btnBg"
                                    >
                                        Save

                                        {loading && 
                                            <div className="spinner-border text-light" style={{width: '1rem', height: '1rem', marginLeft:8}} role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        }
                                    </button>    
                                </div>
                                
                                
                            </div> 
                        </form>
                    </Modal.Body>
                </Modal>   

                <Modal show={editProduct} onHide={() => this.setState({editProduct: false})} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit a product</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={this.handleSubmitEdit}>
                            <div className="row">
                                <div className="col-lg-6 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product title</label>

                                    <input 
                                        required
                                        type="text" 
                                        className="form-control"
                                        name="title"
                                        value={title}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product price</label>

                                    <input
                                        required
                                        type="number" 
                                        className="form-control"
                                        name="price"
                                        value={price}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product image url</label>

                                    <input 
                                        required
                                        type="text" 
                                        className="form-control"
                                        name="image"
                                        value={image}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-lg-6 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product category</label>

                                    <select 
                                        class="form-select"
                                        name="category"
                                        onChange={this.handleChange}
                                        defaultValue={category}
                                    >
                                        {categories.map((item, key) => {
                                            return (<option value={item}>{item[0].toUpperCase() + item.slice(1).toLowerCase()}</option>)
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-12 form-group">
                                    <label for="exampleInputEmail1" class="form-label">Product description</label>

                                    <textarea 
                                        required
                                        class="form-control"
                                        rows="4"
                                        name="description"
                                        value={description}
                                        onChange={this.handleChange}
                                    >

                                    </textarea>
                                </div>

                                <div className="col-lg-12 form-group">
                                    <button
                                        type="submit"
                                        class="btn btn-google btn-block btnBg"
                                    >
                                        Save

                                        {loading && 
                                            <div className="spinner-border text-light" style={{width: '1rem', height: '1rem', marginLeft:8}} role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        }
                                    </button>    
                                </div>
                                
                                
                            </div> 
                        </form>
                    </Modal.Body>
                </Modal>  

                <Modal show={openModal} onHide={() => this.setState({openModal: false})} size="xl">
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-6 d-flex justify-content-center align-items-center">
                                <img src={product.image} style={{maxWidth:564}} height={578} />
                            </div>

                            <div className="col-lg-6">
                                <div className="p-5">
                                    <h1 className="h4 mb-2">{product.title}</h1>

                                    {typeof(product.category) !== "undefined"  ? <h1 className="h3 mb-2"><span className="bg-span">{product.category[0].toUpperCase() + product.category.slice(1).toLowerCase()}</span></h1> : null }

                                    {typeof(product.rating) !== "undefined"  ? <p className="d-flex  align-items-center"><Rater total={5} rating={product.rating.rate} interactive={false} size={25} /> {product.rating.rate} ({product.rating.count})</p> : null}

                                    {typeof(product.price) !== "undefined"  ? <p className="price-detail">Price: {product.price.toLocaleString()}</p> : null}

                                    
                                    <h1 className="h5 mb-2">About this product:</h1>

                                    <p>{product.description}</p>
                                </div>
                            </div>
                        </div> 
                    </Modal.Body>
                </Modal>               

                {isActived && <ToastComponent isActived={isActived} isConnected={isConnected} message={message} onChange={this.isActivedChange} />}

                <Backdrop sx={{ color: '#802c6e', zIndex: (theme) => theme.zIndex.drawer + 1000 }} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>                
            </div>              
        )
    }

}