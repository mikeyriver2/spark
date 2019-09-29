import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {
    Row,
} from 'react-bootstrap';
import NewRecord from '../modals/new-records';
import { timingSafeEqual } from 'crypto';
import {Link} from 'react-router-dom';
import Auth from '../modals/auth';

export default class Sidebar extends Component{
    constructor(){
        super()
        this.state = {
           modal: {
               type: "",
               show: false
           }
        }
        this.handleClick = this.handleClick.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount(){
        document.addEventListener('mousedown', this.handleClick, false);
    }

    closeModal(){
        this.setState(prevState => ({
            modal: {
                ...prevState.modal,
                type: "",
                show: false
            } 
        }))
    }

    handleClick(e){
        if (!e.target.className.includes("layout-main") && this.node && !this.node.contains(e.target) && !this.state.modal.show) {
            this.props.hideSideBar();
        }
    }

    triggerModal(modal){
        this.setState(prevState => ({
           modal: {
               ...prevState.modal,
               type: modal,
               show: !prevState.modal.show
           } 
        }))
    }

    render(){
        return (
            <div ref={(node)=>{this.node = node}} className="layout-sidebar">
                <ul id="sidebar-container" className="sidebar-container sidebar-hidden">
                    <li className="sidebar-user-name">
                        Welcome, <b>Mikey Rivera</b>
                    </li>
                    {/* <li className="sidebar-outter">
                        <Link to="/" >Home</Link>
                        <ul className="sidebar-view-records-parent">
                            <li onClick={e => this.triggerModal('new-record')} className="sidebar-inner">New Record</li>
                        </ul>
                    </li> */}
                    <li className="sidebar-outter">
                        <Link onClick={(e)=>{this.props.toggleAuthModal(e,"register")}} to="/" >Register</Link>
                        {/* <ul className="sidebar-view-records-parent">
                            <li onClick={e => this.triggerModal('new-record')} className="sidebar-inner">New Record</li>
                        </ul> */}
                    </li>
                    <li className="sidebar-outter">
                        <Link onClick={(e)=>{this.props.toggleAuthModal(e,"login")}} to="/" >Login</Link>
                        {/* <ul className="sidebar-view-records-parent">
                            <li onClick={e => this.triggerModal('new-record')} className="sidebar-inner">New Record</li>
                        </ul> */}
                    </li>
                </ul>
                <Auth 
                    changeAuthModalType = {this.props.changeAuthModalType}
                    show = {this.props.show}
                    type = {this.props.type}
                    toggleAuthModal = {this.props.toggleAuthModal}
                />
            </div>
        )
    }
}