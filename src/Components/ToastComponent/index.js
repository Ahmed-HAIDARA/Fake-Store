import React, { Component } from "react";
import { Toast } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer';

export default class ToastComponent extends Component {    

    constructor(props) {
        super(props)
        this.state = {
            isActived: this.props.isActived
        }
    }

    isActivedOnChange(){
        this.setState(
            { isActived:  false },
            () => {
                if (this.props.onChange) {
                    this.props.onChange(false)
                }
            }        
        )

    }

    render() {

        const {isActived} = this.state

        return (
            <ToastContainer
                className="p-3"
                position={'top-end'}
                style={{ zIndex: 1 }}
            >
                <Toast
                    bg={this.props.isConnected ? "success" : "danger"}
                    onClose={() => this.isActivedOnChange()}
                    show={this.state.isActived}
                    delay={5000} autohide
                >
                    <Toast.Body className="text-white">{this.props.message}</Toast.Body>
                </Toast>
            </ToastContainer>                          
        )
    }

}