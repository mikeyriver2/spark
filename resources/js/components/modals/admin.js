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

class AdminModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            showConfirmDeletePledge: false,
            editPledge: {
                editMode: false,
                amount: "",
                id: 0
            },
            editProject: false,
            loading: false,
            showSuccess: false,
            newProjecterrors: {
                title: "",
                description: "",
                banner: "",
                goal_amount: ""
            },
            newProject: {
                title: "",
                description: "",
                banner: "",
                goal_amount: ""
            },
            pledges: [],
            previewBanner: "",
            previewBannerFormFile: "",
            deleting: false,
            viewing: "users",
            companies: [],
            users: [],
            newCompanyName: ""
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
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.renderCompanies = this.renderCompanies.bind(this);
        this.addNewCompany = this.addNewCompany.bind(this);
        this.fetchCompanies = this.fetchCompanies.bind(this);
        this.handleDeleteCompany = this.handleDeleteCompany.bind(this);
        this.toggleViewing = this.toggleViewing.bind(this);
        this.editPledge = this.editPledge.bind(this);
        this.handleEditPledge = this.handleEditPledge.bind(this);
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.show != prevProps.show){
            if(this.props.show){
                this.fetchCompanies();
            }
        }
        if(this.state.editProject != prevState.editProject){
            if(this.state.editProject){
                this.setState(prevState => ({
                    newProject: {
                        ...prevState.newProject,
                        title: this.props.project.title,
                        description: this.props.project.description,
                        banner: this.state.previewBanner == "" ? this.props.project.banner : this.state.previewBanner,
                        goal_amount: this.props.project.goal_amount
                    },
                }));
            }
        }
    }

    fetchCompanies(){
        axios.get('iLikeToMoveItMoveIt/companies').then(res=>{
            this.setState({
                companies: res.data.companies,
                users: res.data.users
            })
        });
    }

    validateCell(cell){ //only checks if string ONLY contains numbers
        var isnum =  /^[0-9.,]+$/.test(cell);
        return isnum;
    }

    handleChangeNewProject(e,type){
        let value = e.target.value;
        let error = {
            type: type,
            error : ""
        };

        if(type == "goal_amount"){
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
                ...prevState.newProjecterrors,
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

    handleSubmitNewProject(editMode = false){
        this.setState({
            loading: true
        });
        const data = new FormData() 
        data.append('banner', this.state.previewBanner != "" ? this.state.previewBannerFormFile : this.state.newProject.banner);
        data.append('title', this.state.newProject.title);
        data.append('description', this.state.newProject.description);
        data.append('goal', this.state.newProject.goal_amount);
        if(this.props.project && this.props.project.id){
            data.append('project_id',this.props.project.id);
        }

        if(!editMode){
            axios.post('iLikeToMoveItMoveIt/projects/project',data).then(res=>{
                this.setState({
                    showSuccess: true,
                },()=>{
                    setTimeout(() => {
                        this.props.fetchProjects();
                        // this.setState(prevState => ({
                        //     loading: false,
                        //     showSuccess: false,
                        //     newProject: {
                        //         ...prevState.newProject,
                        //         title: "",
                        //         description: "",
                        //         banner: "",
                        //         goal: 0
                        //     }
                        // }))
                        this.hideModal();
                    }, 10);
                })
            });
        }else{
            axios.post('iLikeToMoveItMoveIt/projects/edit',data).then(res=>{
                this.setState({
                    showSuccess: true,
                },()=>{
                    setTimeout(() => {
                        this.props.fetchProjects();
                        // this.setState(prevState => ({
                        //     loading: false,
                        //     showSuccess: false,
                        //     newProject: {
                        //         ...prevState.newProject,
                        //         title: "",
                        //         description: "",
                        //         banner: "",
                        //         goal: 0
                        //     }
                        // }))
                        this.hideModal();
                    }, 10);
                })
            });
        }
    }

    handleDelete(){
        this.setState({
            deleting: true
        })
    }

    deleteProject(){
        let data = {
            projectId : this.props.project.id
        }
        axios.post('iLikeToMoveItMoveIt/projects/delete',data).then(res=>{
            this.props.fetchProjects();
            this.hideModal();
        },()=>{/*this.props.fetchProjects()*/});
    }

    editPledge(pledge){
        this.setState(prevState =>({
            editPledge: {
                ...prevState.editPledge,
                editMode : true,
                amount: pledge.amount,
                id: pledge.id,
                pledger: pledge.pledger_name
            }
        }))
    }

    renderPledges(){
        const numberWithCommas = (x)=> {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        if(!this.state.editProject){
            if(!this.state.editPledge.editMode){
                let elements = [];
                if(this.props.project && this.props.project.pledge && this.props.project.pledge.length > 0){
                    this.props.project.pledge.map(pledge=>{
                        elements.push(
                            <tr onClick={()=>{this.editPledge(pledge)}}>
                                <td>{pledge.pledger_name}</td>
                                <td>{pledge.company_name}</td>
                                <td>{numberWithCommas(pledge.amount)}</td>
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
                if(this.state.showConfirmDeletePledge){
                    return (
                        <div>
                            You are about to delete {this.state.editPledge.pledger}'s pledge.
                            <div style={{marginTop:"10px"}}>
                                <a onClick={()=>{this.handleEditPledge("back")}} style={{cursor: "pointer", float:"right", marginRight:"10px", fontWeight: "bold"}}>Cancel</a>
                                <a onClick={()=>{this.handleEditPledge('confirm_delete')}} style={{width:"100%"}} style={{cursor: "pointer", float:"right", marginRight:"10px", fontWeight: "bold", color: "red"}}><b>Delete</b></a>
                            </div>
                        </div>
                    )
                }else{
                    return (
                        <div>
                            <Form.Label>Editing {this.state.editPledge.pledger}'s pledged amount</Form.Label>
                            <Form.Group controlId="newProjectTitle">
                                <Form.Control value={this.state.editPledge.amount} onChange={(e)=>{
                                    //console.log('asssssssssssssssssssssss')
                                    e.persist();
                                    this.setState(prevState =>({
                                        editPledge: {
                                            ...prevState.editPledge,
                                            amount: e.target.value,
                                        }
                                    }))                            
                                }} placeholder="enter amount" />
                            </Form.Group>
                            <div className="edit-pledge-buttons">
                                <Button onClick={()=>{this.handleEditPledge('save')}} variant="success">Save</Button>
                                <Button onClick={()=>{this.handleEditPledge('delete')}} variant="danger">Delete</Button>
                            </div>
                            <Button onClick={()=>{this.handleEditPledge('back')}} style={{width:"100%"}}>Back</Button>
                        </div>
                    )
                }
            }
        }else{
            return this.renderEditProject()
        }
    }

    handleEditPledge(action = "back"){
        let resetValue = {
            editMode: false,
            amount: "",
            id: 0
        };

        let values = this.state.editPledge;

        if(action == "save"){
            axios.post('iLikeToMoveItMoveIt/pledge',values).then(res=>{
                this.setState(prevState =>({
                    editPledge: {
                        //...prevState.editPledge,
                        ...resetValue
                    }
                }),()=>{
                    this.props.fetchProjects();
                });       
            });     
        }else if(action == "delete"){
            this.setState({
                showConfirmDeletePledge: true
            })
        }else if(action == "confirm_delete"){
            axios.post('iLikeToMoveItMoveIt/pledge-destory',values).then(res=>{
                this.setState(prevState =>({
                    showConfirmDeletePledge: false,
                    editPledge: {
                        //...prevState.editPledge,
                        ...resetValue
                    }
                }),()=>{
                    
                    this.props.fetchProjects();
                });       
            });
        }else if(action == "back"){
            //console.log('callingfwqweqwewqe');
            this.setState(prevState=>({
                editPledge : {
                    //...prevState.editPledge,
                    ...resetValue
                },
                showConfirmDeletePledge: false
            }));
        }
    }

    previewNewBanner(e){
        this.setState({
            loading: true,
            previewBannerFormFile: e.target.files[0] 
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
        if(document.getElementById(idInput)){
            $(`#${idInput}`).click();
        }

    }
    renderEditProject(){
        let disableButton = false;
        if(this.state.newProjecterrors.goal_amount != "" || this.state.newProject.title == "" || this.state.newProject.description == "" || this.state.newProject.goal_amount == 0 || this.state.loading){
            disableButton = true;
        }
        let banner_style={cursor: "pointer", width: "400px", height: "200px", backgroundImage: `url("${this.state.previewBanner == "" ? this.props.project.banner : this.state.previewBanner}"`, backgroundSize: "cover"}
        let idInput = `${this.props.project.id}edit-project-banner-preview`;
        return (
            <div className="admin-create-project">
                <Form.Group controlId="newProjectTitle">
                    <Form.Control value={this.state.newProject.title} onChange={(e)=>{this.handleChangeNewProject(e,"title")}} placeholder="Project Title (required)" />
                </Form.Group>
                
                <Form.Group controlId="newProjectDesc">
                    <Form.Control value={this.state.newProject.description} onChange={(e)=>{this.handleChangeNewProject(e,"description")}} placeholder="Project Description (required)" />
                </Form.Group>

                <Form.Group controlId="newProjectGoal">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputPeso">₱</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control value={this.state.newProject.goal_amount} onChange={(e)=>{this.handleChangeNewProject(e,"goal_amount")}} placeholder="Goal Amount (required)" />
                        {this.state.newProjecterrors.goal_amount != "" && <small style={{color:"red"}}>Please enter a valid number</small>}
                    </InputGroup>
                </Form.Group>   
 
                {/* <Form.Group controlId="newProjectBanner">
                    <Form.Label style={{marginRight:"10px"}}><b>Banner (optional)</b></Form.Label>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                </Form.Group> */}

                <h4>Banner:</h4>
                <input style={{display:"none"}} onChange={this.previewNewBanner} id={idInput} type="file" name="file"/>
                <div onClick={()=>{this.manualOnChange(idInput)}} style={banner_style}></div>
                <Button disabled={disableButton} onClick={()=>{this.handleSubmitNewProject(true)}} style={{marginTop: "20px", width:"100%"}}>
                    {this.state.loading ?
                        loader()
                        :
                        "Save Changes"
                    }
                </Button>
            </div>
        )
    }

    renderCreateProject(){
        let disableButton = false;
        if(this.state.newProjecterrors.goal_amount != "" || this.state.newProject.title == "" || this.state.newProject.description == "" || this.state.newProject.goal == 0 || this.state.loading){
            disableButton = true;
        }
        return (
            <div className="admin-create-project">
                <Form.Group controlId="newProjectTitle">
                    <Form.Control value={this.state.newProject.title} onChange={(e)=>{this.handleChangeNewProject(e,"title")}} placeholder="Project Title (required)" />
                </Form.Group>
                
                <Form.Group controlId="newProjectDesc">
                    <Form.Control value={this.state.newProject.description} onChange={(e)=>{this.handleChangeNewProject(e,"description")}} placeholder="Project Description (required)" />
                </Form.Group>

                <Form.Group controlId="newProjectGoal">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputPeso">₱</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control value={this.state.newProject.goal_amount} onChange={(e)=>{this.handleChangeNewProject(e,"goal_amount")}} placeholder="Goal Amount (required)" />
                        {this.state.newProjecterrors.goal_amount != "" && <small style={{color:"red"}}>Please enter a valid number</small>}
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="newProjectBanner">
                    <Form.Label style={{marginRight:"10px"}}><b>Banner (optional)</b></Form.Label>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                </Form.Group>

                <Button disabled={disableButton} onClick={()=>{this.handleSubmitNewProject(false)}} style={{width:"100%"}}>
                    {this.state.loading ?
                        loader()
                        :
                        "Submit"
                    }
                </Button>
            </div>
        )
    }

    hideModal(){ //resetting state
        this.setState({
            editProject: false,
            loading: false,
            showSuccess: false,
            newProjecterrors: {
                title: "",
                description: "",
                banner: "",
                goal_amount: ""
            },
            newProject: {
                title: "",
                description: "",
                banner: "",
                goal_amount: ""
            },
            pledges: [],
            previewBanner: "",
            previewBannerFormFile: "",
            deleting: false,
        })
        this.props.toggleAdminModal()
    }

    addNewCompany(){
        axios.post('iLikeToMoveItMoveIt/company',{name: this.state.newCompanyName}).then(res=>{
            this.setState({
                newCompanyName: ""
            },()=>{
                this.fetchCompanies();
            })
        })
    }

    handleDeleteCompany(company_id){
        axios.post('iLikeToMoveItMoveIt/delCompany',{company_id}).then(res=>{
            this.fetchCompanies();
        })
    }

    renderCompanies(){
        let elements = [];
        let {companies, users} = this.state;
        if(this.state.viewing == "companies"){
            if(companies && companies.length > 0){
                companies.map(company=>{
                    elements.push(
                        <tr>
                            <td>{company.created_at}</td>
                            <td>{company.name}</td>
                            <td><Button variant="danger" onClick={(e)=>{this.handleDeleteCompany(company.id)}} disabled={!company.deletable}>Delete</Button></td>
                        </tr>
                    )
                })
                return (
                    <div>
                        <Form.Group controlId="newProjectDesc">
                            <Form.Control value={this.state.newCompanyName} onChange={(e)=>{this.setState({newCompanyName: e.target.value})}} placeholder="Company Name" />
                        </Form.Group>
                        <Button disabled={this.state.newCompanyName == ""} onClick={this.addNewCompany}>Add New Company</Button>
                        <br />
                        <hr />
                        <p>Note: Cannot Delete Companies who have registered users</p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Created At</th>
                                    <th>Company Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {elements}
                            </tbody>
                        </Table>
                    </div> 
                )
            }
        }else if(this.state.viewing == "users"){
            if(users && users.length > 0){
                users.map(user=>{
                    elements.push(
                        <div className="userInfos">
                            <p><b>Name: </b>{user.name}</p>
                            <p><b>Email: </b>{user.email}</p>
                            <p><b>Secondary Email: </b>{user.secondary_email ? user.secondary_email : "-"}</p>
                            <p><b>Comapny: </b>{user.company.name}</p>
                            <p><b>Contact #: </b>{user.contact ? user.contact : "-"}</p>
                            <p><b>Registered At: </b>{user.created_at}</p>
                            <hr />
                        </div>
                    )
                })
                return (
                    <div className="userList">
                        {elements}
                    </div> 
                )
            }

        }
    }

    toggleViewing(){
        let { viewing } = this.state;
        viewing = viewing == "companies" ? "users" : "companies";
        this.setState({
            viewing: viewing
        });
    }

    render(){
        let title = "";
        if(this.props.parentComponent == "Auth"){
            if(this.props.type == "nProject"){
                title = "Create New Project"
            }else{
                if(this.state.viewing == "companies"){
                    title = "Manage Companies"
                }else{
                    title = "Users List"
                }
            }
        }else if(this.props.parentComponent == "Project"){
            title = `Pledges to ${this.props.project.title}`;
        }
        return (
            <div>
                <Modal id="admin-modal" show={this.props.show} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <h5>{title}</h5>
                        {(this.props.type && this.props.type == "companies") && <Button onClick={this.toggleViewing}>{this.state.viewing == "users" ? "Manage Companies" : "View Users List"}</Button>}
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.deleting ? 
                                <div>
                                    You are about to delete {this.props.project.title}.
                                    <div style={{marginTop:"10px"}}>
                                        <a onClick={this.hideModal} style={{cursor: "pointer", float:"right", marginRight:"10px", fontWeight: "bold"}}>Cancel</a>
                                        <a onClick={this.deleteProject} style={{cursor: "pointer", float:"right", marginRight:"10px", fontWeight: "bold", color: "red"}}><b>Delete</b></a>
                                    </div>
                                </div>
                            : this.props.parentComponent == "Auth" ? 
                            this.props.type == "nProject" ? this.state.showSuccess ?
                                <div>
                                    Success! Your Project has been created and posted.
                                </div>
                            :
                                this.renderCreateProject()
                            :
                                this.renderCompanies()
                            :
                                <div>
                                    { this.renderPledges() }
                                    {(!this.state.showConfirmDeletePledge && !this.state.editPledge.editMode) &&
                                        <div>
                                            <hr />
                                            <h4>Project Settings</h4>
                                            {!this.state.editProject &&
                                                <Button onClick={()=>{this.setState({editProject: true})}} style={{width: "100%"}} variant="primary">Edit Project</Button>
                                            }
                                            <Button onClick={this.handleDelete} style={{marginTop: "15px", width: "100%"}} variant="danger">Delete Project</Button>
                                        </div>
                                    }
                                </div>
                        }
                    </Modal.Body>
                </Modal>
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

export default connect(mapStateToProps,mapDispatchToProps)(AdminModal);