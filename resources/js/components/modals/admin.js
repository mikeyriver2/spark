import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col,
    Modal,
    Form,
    InputGroup,
    FormControl,
    Button,
    Table
} from 'react-bootstrap';
import axios from 'axios';
import * as helpers from '../../helpers/validations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/index';
import {loader} from '../utilities/loading';

export default class AdminModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            editProject: false,
            loading: false,
            showSuccess: false,
            newProjecterrors: {
                title: "",
                description: "",
                banner: "",
                goal: 0
            },
            newProject: {
                title: "",
                description: "",
                banner: "",
                goal: 0
            },
            pledges: [],
            previewBanner: ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleChangeNewProject = this.handleChangeNewProject.bind(this);
        this.renderCreateProject = this.renderCreateProject.bind(this);
        this.handleSubmitNewProject = this.handleSubmitNewProject.bind(this);
        this.renderPledges = this.renderPledges.bind(this);
        this.renderEditProject = this.renderEditProject.bind(this);
        this.previewNewBanner = this.previewNewBanner.bind(this);
        this.manualOnChange = this.manualOnChange.bind(this);
        this.previewNewBanner = this.previewNewBanner.bind(this);
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.editProject != prevState.editProject){
            if(this.state.editProject){
                this.setState(prevState => ({
                    newProject: {
                        ...prevState.newProject,
                        title: this.props.project.title,
                        description: this.props.project.description,
                        banner: this.state.previewBanner == "" ? this.props.project.banner : this.state.previewBanner,
                        goal: this.props.project.goal_amount
                    },
                }));
            }
        }
    }

    validateCell(cell){ //only checks if string ONLY contains numbers
        var isnum = /^\d+$/.test(cell);
        return isnum;
    }

    handleChangeNewProject(e,type){
        let value = e.target.value;
        let error = {
            type: type,
            error : ""
        };

        if(type == "goal"){
            if(!this.validateCell(value)){
                error.error = "Enter a valid Contact Number"
            }
        }

        e.persist(); //e.target.value will mess up when called in prevstate fnc
        this.setState(prevState=>({
            newProject:{
                ...prevState.newProject,
                [type]: e.target.value
            },
            newProjecterrors:{
                ...prevState.errors,
                [type]: error.error
            },
          }));
    }

    onChangeHandler(e){
        e.persist()
        this.setState(prevState=>({
            newProject:{
                ...prevState.newProject,
                banner: e.target.files[0]
            }
          }));
    }

    handleSubmitNewProject(){
        this.setState({
            loading: true
        });
        const data = new FormData() 
        data.append('banner', this.state.newProject.banner);
        data.append('title', this.state.newProject.title);
        data.append('description', this.state.newProject.description);
        data.append('goal', this.state.newProject.goal);

        axios.post('iLikeToMoveItMoveIt/project',data).then(res=>{
            this.setState({
                showSuccess: true,
            },()=>{
                setTimeout(() => {
                    this.setState(prevState => ({
                        loading: false,
                        showSuccess: false,
                        newProject: {
                            ...prevState.newProject,
                            title: "",
                            description: "",
                            banner: "",
                            goal: 0
                        }
                    }))
                }, 500330);
            })
        });
    }

    renderPledges(){
        if(!this.state.editProject){
            let elements = [];
            if(this.props.project && this.props.project.pledge && this.props.project.pledge.length > 0){
                this.props.project.pledge.map(pledge=>{
                    elements.push(
                        <tr>
                            <td>{pledge.pledger_name}</td>
                            <td>{pledge.company_name}</td>
                            <td>{pledge.amount}</td>
                        </tr>
                    )
                });
            }
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name of Pledgers</th>
                            <th>Company</th>
                            <th>Amount Pledged</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements}
                    </tbody>
                </Table> 
            );
        }else{
            return this.renderEditProject()
        }
    }

    previewNewBanner(e){
        this.setState({
            loading: true
        });
        const data = new FormData() 
        data.append('banner', e.target.files[0]);
        axios.post('banner_preview',data).then(res=>{
            this.setState({
                previewBanner: res.data.img_loc,
                loading: false
            });
        })
    }

    manualOnChange(idInput){
        console.log('calliiiiing')
        if(document.getElementById(idInput)){
            $(`#${idInput}`).click();
        }

    }
    renderEditProject(){
        let disableButton = false;
        if(this.state.newProjecterrors.goal != "" || this.state.newProject.title == "" || this.state.newProject.description == "" || this.state.newProject.goal == 0 || this.state.loading){
            disableButton = true;
        }
        let banner_style={width: "400px", height: "200px", backgroundImage: `url("${this.state.previewBanner == "" ? this.props.project.banner : this.state.previewBanner}"`, backgroundSize: "cover"}
        let idInput = `${this.props.project.id}edit-project-banner-preview`;
        return (
            <div className="admin-create-project">
                <Form.Group controlId="newProjectTitle">
                    <Form.Control value={this.state.newProject.title} onChange={(e)=>{this.handleChangeNewProject(e,"title")}} placeholder="Project Title (required)" />
                </Form.Group>
                
                <Form.Group controlId="newProjectDesc">
                    <Form.Control value={this.state.newProject.description} onChange={(e)=>{this.handleChangeNewProject(e,"description")}} placeholder="Project Title (required)" />
                </Form.Group>

                <Form.Group controlId="newProjectGoal">
                    <Form.Control value={this.state.newProject.goal} onChange={(e)=>{this.handleChangeNewProject(e,"goal")}} placeholder="Goal Amount (required)" />
                    {this.state.newProjecterrors.goal != "" && <small style={{color:"red"}}>Please enter a valid number</small>}
                </Form.Group>

                {/* <Form.Group controlId="newProjectBanner">
                    <Form.Label style={{marginRight:"10px"}}><b>Banner (optional)</b></Form.Label>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                </Form.Group> */}

                <h4>Banner:</h4>
                <input style={{display:"none"}} onChange={this.previewNewBanner} id={idInput} type="file" name="file"/>
                <div onClick={()=>{this.manualOnChange(idInput)}} style={banner_style}></div>
                <Button disabled={disableButton} onClick={this.handleSubmitNewProject} style={{width:"100%"}}>
                    {this.state.loading ?
                        loader()
                        :
                        "Submit"
                    }
                </Button>
            </div>
        )
    }

    renderCreateProject(){
        let disableButton = false;
        if(this.state.newProjecterrors.goal != "" || this.state.newProject.title == "" || this.state.newProject.description == "" || this.state.newProject.goal == 0 || this.state.loading){
            disableButton = true;
        }
        return (
            <div className="admin-create-project">
                <Form.Group controlId="newProjectTitle">
                    <Form.Control value={this.state.newProject.title} onChange={(e)=>{this.handleChangeNewProject(e,"title")}} placeholder="Project Title (required)" />
                </Form.Group>
                
                <Form.Group controlId="newProjectDesc">
                    <Form.Control value={this.state.newProject.description} onChange={(e)=>{this.handleChangeNewProject(e,"description")}} placeholder="Project Title (required)" />
                </Form.Group>

                <Form.Group controlId="newProjectGoal">
                    <Form.Control value={this.state.newProject.goal} onChange={(e)=>{this.handleChangeNewProject(e,"goal")}} placeholder="Goal Amount (required)" />
                    {this.state.newProjecterrors.goal != "" && <small style={{color:"red"}}>Please enter a valid number</small>}
                </Form.Group>

                <Form.Group controlId="newProjectBanner">
                    <Form.Label style={{marginRight:"10px"}}><b>Banner (optional)</b></Form.Label>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                </Form.Group>

                <Button disabled={disableButton} onClick={this.handleSubmitNewProject} style={{width:"100%"}}>
                    {this.state.loading ?
                        loader()
                        :
                        "Submit"
                    }
                </Button>
            </div>
        )
    }

    render(){
        let title = "";
        if(this.props.parentComponent == "Auth"){
            title = "Create New Project"
        }else if(this.props.parentComponent == "Project"){
            title = `Pledges to ${this.props.project.title}`;
        }
        return (
            <div>
                <Modal id="pledges-modal" show={this.props.show} onHide={()=>this.props.toggleAdminModal()}>
                    <Modal.Header closeButton>
                        <h5>{title}</h5>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.parentComponent == "Auth" ? this.state.showSuccess ?
                                <div>
                                    Success! Your Project has been created and posted.
                                </div>
                            :
                                this.renderCreateProject()
                            :
                                <div>
                                    { this.renderPledges() }
                                    <hr />
                                    <h4>Project Settings</h4>
                                    <Button onClick={()=>{this.setState({editProject: true})}} style={{width: "100%"}} variant="primary">Edit Project</Button>
                                    <Button style={{marginTop: "15px", width: "100%"}} variant="warning">Delete Project</Button>
                                </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}