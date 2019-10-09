import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col,
    Button
} from 'react-bootstrap';
import Project from '../modules/project';
import axios from "axios";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/index';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            user: {}
        }
        this.renderProjects = this.renderProjects.bind(this);
    }

    componentDidMount(){
        axios.get('/check-user').then(res=>{
            this.setState({
                user: res.data
            });
        }).then(err=>{

        });
        setInterval(() => { this.props.fetchProjects() }, 5000);
    }

    componentDidUpdate(prevProps){ //not an idea fix but it works //to address the not-seemingless transition when redux called
        if(this.props.projects){
            if(this.props.projects.length != prevProps.projects.length){
                let propsProject = {};
                if(this.props.projects && this.props.projects.length > 0){
                    let propsProjects = this.props.projects;
                    let sortedProjects = propsProjects.sort((a,b)=>{
                        let AtotalPledges = 0;
                        if(a.pledge.length > 0){
                            a.pledge.map(apledge=>{
                                AtotalPledges += apledge.amount;
                            });
                        }
                        let Apercent = (Number(a.goal_amount.replace(/,/g, ''))/AtotalPledges)*100;
                        console.log(a.goal_amount)

                        let BtotalPledges = 0;
                        if(b.pledge.length > 0){
                            b.pledge.map(bpledge=>{
                                BtotalPledges += bpledge.amount;
                            });
                        }
                        let Bpercent = (Number(b.goal_amount.replace(/,/g, ''))/BtotalPledges)*100;

                        if(Apercent < Bpercent){
                            return 1
                        }
                        if(Apercent > Bpercent){
                            return -1
                        }
                        return 0; //when equal

                    });
                    console.log(sortedProjects);
                    this.setState({
                        projects: sortedProjects
                    })
                }
            }
        }
    }

    renderProjects(){
        return this.state.projects.map(project=>{
            return <Project 
                        fetchProjects={this.props.fetchProjects}
                        user={this.props.user} 
                        project={project} 
                    />
        })
    }

    render(){
        let layoutWidth = 0;
        let minHeightStyle = {};
        minHeightStyle.minHeight = ""
        if(document.getElementById("app-layout")){
            layoutWidth = document.getElementById("app-layout").offsetHeight;
            minHeightStyle.minHeight = `calc(100vh - ${layoutWidth}px`;
        }
        
        return (
            <div style={minHeightStyle} className="dashboard-container">
                <div className="projects-container">
                    {(this.state.projects && this.state.projects.length > 0) &&
                        this.renderProjects()
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.checkUser,
      projects: state.projects
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({},actions),dispatch)

  }

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);