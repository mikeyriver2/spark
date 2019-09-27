import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
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
            width: window.innerWidth
        }
        this.header = React.createRef();
        this.switchSideBar = this.switchSideBar.bind(this);
        
    }
    
    componentDidMount(){
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

    switchSideBar(){
        let element = document.getElementById('sidebar-container')
        let classes = element.className;
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
                                    <a>REGISTER</a>
                                    <a>LOGIN</a>
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
                />
                
                
                <Route exact path={`/`} component={Dashboard}/>
                <Route exact path={`/home`} component={Dashboard}/>
            </div>
        )
    }
}