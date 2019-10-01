import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Auth from '../modals/auth';
import {
    Row,
} from 'react-bootstrap';

export default class Layout extends Component{
    constructor(){
        super();
        this.state = {
            appHeight: "",
            ass: "ass",
            showSideBar: false,
            width: window.innerWidth,
            showAuth: {
                show: false,
                type: ""
            },
            isLoggedIn: false,
        }
        this.header = React.createRef();
        this.toggleAuthModal = this.toggleAuthModal.bind(this);
        this.switchSideBar = this.switchSideBar.bind(this);
        this.changeAuthModalType = this.changeAuthModalType.bind(this);
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    }
    
    componentDidMount(){
        this.checkIfLoggedIn();
        window.addEventListener("resize", ()=>{
            this.setState({
                width: window.innerWidth
            });
        });
        this.setState({
            appHeight: document.getElementById('pediatrix').clientHeight
        },()=>{
            //console.log(this.state.appHeight);
            //document.getElementById('sidebar-container').style.height = `${this.state.appHeight}px`;
        })
    }

    checkIfLoggedIn(){
        axios.get('/check-user').then(res=>{

        }).then(err=>{

        });
    }

    switchSideBar(){
        let element = document.getElementById('sidebar-container')
        let classes = element.className;
        console.log(classes);
        if(classes.includes("sidebar-hidden")){
            this.setState({
                showSideBar: true
            },()=>{
                element.classList.remove("sidebar-hidden");
                element.classList.add("sidebar-show");
                document.getElementById('pediatrix').style.height = "100vh"; //temporarily disable scroll
                document.getElementById('pediatrix').style.overflow = "hidden";
            })
        }else{
            this.setState({
                showSideBar: false
            },()=>{
                element.classList.remove("sidebar-show");
                element.classList.add("sidebar-hidden");
                document.getElementById('pediatrix').removeAttribute("style"); //re-enable scroll
            })
        }
    }
    
    hideSideBar(){
        let element = document.getElementById('sidebar-container')
        element.classList.remove("sidebar-show");
        element.classList.add("sidebar-hidden");     
        document.getElementById('pediatrix').removeAttribute("style"); 
    }

    toggleAuthModal(e, type){
        let bool = this.state.showAuth.show;
        this.setState(prevState=>({
            showAuth: {
                ...prevState.showAuth,
                show: !bool,
                type: type
            }
        }))
    }

    changeAuthModalType(type){
        this.setState(prevState=>({
           showAuth:{
               ...prevState.showAuth,
               type: type
           } 
        }))
    }



    render(){
        let isAdmin = false;
        let isMobile = this.state.width <= 768;
        return (
            <div ref={this.header} className="main-layout">
                <div className="layout-header">
                    <Row className="layout-main-logo">
                        <img src="/images/cropped-SPARK_LOGO-1.png"/>
                        <div className="caption-container">
                            <p className="caption">INVEST IN HER: PARTNERSHIPS FOR GIRLS INITIATIVE</p>
                        </div>
                        {isMobile ?
                            <div onClick={this.switchSideBar} id="nav-button" class="menu-toggle">
                                <span class="bar top-bar"></span>
                                <span class="bar middle-bar"></span>
                                <span class="bar bottom-bar"></span>
                            </div>
                            :
                            <div className="reg-login">
                                <nav>
                                    <a onClick={(e)=>{this.toggleAuthModal(e,"register")}}>REGISTER</a>
                                    <a onClick={(e)=>{this.toggleAuthModal(e,"login")}}>LOGIN</a>
                                </nav>
                            </div>
                        }
                    </Row>
                    {/* <Row className="layout-nav">
                        <h5 className="layout-main-nav">HOME</h5>
                    </Row> */}
                </div>
                <Sidebar
                    layoutRef = {this.header}
                    showSideBar = {this.state.showSideBar}
                    hideSideBar = {this.hideSideBar}
                    ///////////////////////////////////
                    changeAuthModalType = {this.changeAuthModalType}
                    show = {this.state.showAuth.show}
                    type = {this.state.showAuth.type}
                    toggleAuthModal = {this.toggleAuthModal}
                />
                <Auth 
                    checkIfLoggedIn = {this.checkIfLoggedIn}
                    changeAuthModalType = {this.changeAuthModalType}
                    show = {this.state.showAuth.show}
                    type = {this.state.showAuth.type}
                    toggleAuthModal = {this.toggleAuthModal}
                />
                
                
                <Route exact path={`/`} component={Dashboard}/>
                <Route exact path={`/home`} component={Dashboard}/>
            </div>
        )
    }
}