import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col,
    Button
} from 'react-bootstrap';
import Project from '../modules/Project'
export default class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            appointments: [],
            quickSummaries: {},
            payments: []
        }
    }

    render(){
        return (
            <div className="dashboard-container">
                <div className="projects-container">
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                </div>
            </div>
        )
    }
}