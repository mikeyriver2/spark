import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col,
    Button
} from 'react-bootstrap';
import Project from '../modules/Project'
import axios from "axios";
export default class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            projects: [],
            user: {}
        }
        this.renderProjects = this.renderProjects.bind(this);
        this.fetchProjects = this.fetchProjects.bind(this);
    }

    componentDidMount(){
        axios.get('/check-user').then(res=>{
            this.setState({
                user: res.data
            });
        }).then(err=>{

        });
        this.fetchProjects();
    }

    renderProjects(){
        return this.state.projects.map(project=>{
            return <Project 
                        fetchProjects={this.fetchProjects}
                        user={this.state.user} 
                        project={project} 
                    />
        })
    }

    fetchProjects(){
        axios.get('projects').then(res=>{
            this.setState({
                projects: res.data
            });
        });
    }

    render(){
        return (
            <div className="dashboard-container">
                <div className="projects-container">
                    {(this.state.projects && this.state.projects.length > 0) &&
                        this.renderProjects()
                    }
                </div>
            </div>
        )
    }
}