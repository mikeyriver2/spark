import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Auth from '../modals/auth';
import {
    Row,
} from 'react-bootstrap';
import * as actions from '../../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Pledges from '../modals/pledges';
import AdminModal from '../modals/admin';

class Layout extends Component{
    constructor(props){
        super(props);
        this.state = {
            showAdminModal: false,
            showPledges: false,
            appHeight: "",
            //showSideBar: false, REDUX-ed
            width: window.innerWidth,
            showAuth: {
                show: false,
                type: ""
            },
            showMenu: false,
            user: {}
        }
        this.header = React.createRef();
        this.toggleAuthModal = this.toggleAuthModal.bind(this);
        this.switchSideBar = this.switchSideBar.bind(this);
        this.changeAuthModalType = this.changeAuthModalType.bind(this);
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.togglePledgesModal = this.togglePledgesModal.bind(this);
        this.handleClickOut = this.handleClickOut.bind(this);
        this.toggleAdminModal = this.toggleAdminModal.bind(this);
        this.fetchProjects = this.fetchProjects.bind(this);
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
        });
        document.addEventListener('mousedown', this.handleClickOut, false);
        this.fetchProjects();
    }

    componentWillUnmount(){
        document.addEventListener('mousedown', this.handleClickOut, false);
    }

    fetchProjects(){
        //axios.get('projects').then(res=>{
        this.props.fetchProjects();
        //});
    }

    handleClickOut(e){
        if (!this.li.contains(e.target)) {
            this.toggleMenu()
        }
    }

    toggleAdminModal(){
        let bool = this.state.showAdminModal;
        this.setState({
            showAdminModal: !bool
        });
    }

    togglePledgesModal(){
        let bool = this.state.showPledges;
        this.setState({
            showPledges: !bool
        });
    }

    checkIfLoggedIn(){ //make this redux in the future
        axios.get('/check-user').then(res=>{
            this.props.checkUser(res.data); //redux           
            this.setState({
                user: res.data
            });
        }).then(err=>{

        });
    }

    toggleMenu(){
        let bool = this.state.showMenu;
        this.setState({
            showMenu: !bool
        })
    }

    switchSideBar(){
        let element = document.getElementById('sidebar-container')
        let classes = element.className;
        //console.log(classes);
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
        this.props.toggleAuthModal();
        let bool = this.state.showAuth.show;
        this.setState(prevState=>({
            showAuth: {
                ...prevState.showAuth,
                //show: !bool,
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
        if(this.props.user && this.props.user.type){
            if(this.props.user.type == "admin"){
                isAdmin = true
            }
        }
        return (
            <div ref={this.header} className="main-layout">
                <div className="layout-header">
                    <Row className="layout-main-logo">
                        <img src="/images/IDG_FB.png"/>
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
                                {(this.state.user && this.state.user.name) ?
                                    <nav>
                                        <a onClick={this.toggleMenu} href="#">Welcome, {this.state.user.name}</a>
                                        {this.state.showMenu &&
                                            <li ref={(node)=>{this.li = node}}>
                                                <ul><a onClick={this.togglePledgesModal} style={{color:"black"}}>View Pledged Projects</a></ul>
                                                {
                                                    isAdmin && <ul onClick={this.toggleAdminModal}>
                                                        <a style={{color:"black"}}>
                                                            Start New Project
                                                        </a>
                                                    </ul>
                                                }
                                                <ul><a style={{color:"black"}} href="/logout">Logout</a></ul>
                                            </li>
                                        }
                                    </nav>
                                :
                                    <nav>
                                        <a onClick={(e)=>{this.toggleAuthModal(e,"register")}}>REGISTER</a>
                                        <a onClick={(e)=>{this.toggleAuthModal(e,"login")}}>LOGIN</a>
                                    </nav>
                                }
                            </div>
                        }
                    </Row>
                    {/* <Row className="layout-nav">
                        <h5 className="layout-main-nav">HOME</h5>
                    </Row> */}
                </div>
                <Sidebar
                    user = {this.state.user}
                    layoutRef = {this.header}
                    showSideBar = {this.state.showSideBar}
                    hideSideBar = {this.hideSideBar}
                    ///////////////////////////////////
                    changeAuthModalType = {this.changeAuthModalType}
                    show = {this.props.showAuthModal /*this.state.showAuth.show*/}
                    type = {this.state.showAuth.type}
                    toggleAuthModal = {this.toggleAuthModal}
                    togglePledgesModal = {this.togglePledgesModal}
                    showPledges = {this.state.showPledges}
                    isAdmin = {isAdmin}
                    toggleAdminModal = {this.toggleAdminModal}
                />
                <Auth 
                    checkIfLoggedIn = {this.checkIfLoggedIn}
                    changeAuthModalType = {this.changeAuthModalType}
                    show = {this.props.showAuthModal /*this.state.showAuth.show*/} //reduxed 
                    type = {this.state.showAuth.type}
                    toggleAuthModal = {this.toggleAuthModal}
                />
                <Pledges 
                    togglePledgesModal = {this.togglePledgesModal}
                    showPledges = {this.state.showPledges}
                />
                <AdminModal 
                    show = {this.state.showAdminModal}
                    toggleAdminModal = {this.toggleAdminModal}
                    parentComponent = "Auth"
                />
                
                <Route exact path={`/`} component={Dashboard}/>
                <Route exact path={`/home`} component={Dashboard}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.checkUser,
      showAuthModal: state.showAuthModal
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({},actions),dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout);