import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {
    Row,
} from 'react-bootstrap';
import NewRecord from '../modals/new-records';
import { timingSafeEqual } from 'crypto';
import {Link} from 'react-router-dom';
import Auth from '../modals/auth';
import Pledges from '../modals/pledges';

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
        let isUserLoggedIn = (this.props.user && this.props.user.name)
        return (
            <div ref={(node)=>{this.node = node}} className="layout-sidebar">
                <ul id="sidebar-container" className="sidebar-container sidebar-hidden">
                    <li className="sidebar-user-name">
                        {isUserLoggedIn ?
                            <div>Welcome, <b>{this.props.user.name}</b></div>
                            :
                            <div>Please Register/Login</div>
                        }
                    </li>
                    {/* <li className="sidebar-outter">
                        <Link to="/" >Home</Link>
                        <ul className="sidebar-view-records-parent">
                            <li onClick={e => this.triggerModal('new-record')} className="sidebar-inner">New Record</li>
                        </ul>
                    </li> */}
                    <li className="sidebar-outter">
                        {
                            !isUserLoggedIn ?
                                <Link onClick={(e)=>{this.props.toggleAuthModal(e,"register")}} to="/" >Register</Link>    
                            :
                                <Link onClick={this.props.togglePledgesModal} >View Pledges</Link>
                        }
                        {/* <ul className="sidebar-view-records-parent">
                            <li onClick={e => this.triggerModal('new-record')} className="sidebar-inner">New Record</li>
                        </ul> */}
                    </li>
                    {
                        this.props.isAdmin &&
                        <li className="sidebar-outter">
                            <Link onClick={this.props.toggleAdminModal}>Start New Pledge</Link>
                        </li>
                    }
                    <li className="sidebar-outter">
                        {
                            !isUserLoggedIn ?
                              <Link onClick={(e)=>{this.props.toggleAuthModal(e,"login")}} to="/" >Login</Link>
                            :
                                <a href="/logout" >Logout</a>
                        }
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
                <Pledges 
                    togglePledgesModal = {this.props.togglePledgesModal}
                    show = {this.props.showPledges}
                />
            </div>
        )
    }
}