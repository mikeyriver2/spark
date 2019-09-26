import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import Layout from './layout/layout';
import axios from 'axios'

class Routes extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    componentDidMount(){
        
    }

    render(){
        return (
            <Router>
                <Route path="" component={Layout} /> 
            </Router>
            );
    }
}

export default Routes;