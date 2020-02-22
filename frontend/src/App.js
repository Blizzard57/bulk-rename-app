import React from 'react';
import UserTable from './components/UserTable';
import Form from './components/Form';
import Message from './components/Message';
import UserAPI from './UserAPI';
import Navbar from './components/Navbar';

const location = 'Home';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            isEditForm: false,
            user: {
                firstName: "",
                lastName: "",
                job: ""
            },
            message: ""
        };
        
        this.deleteHandler = this.deleteHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
    }

    componentDidMount(){
        UserAPI.getUser().then(data=>{
            console.log(data);
            this.setState({users : data})});
    }

    resetForm(){
        this.setState({
            user: {
                firstName : "",
                lastName : "",
                job : ""
            }
        });
    }

    handleChange(e){
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name] : e.target.value
            }
        });
    }

    showEditForm(user){
        this.setState({isEditForm: true, user : user});
    }

    async deleteHandler(id){
        {/*console.log(id.user._id);*/}
        const deleteData = await UserAPI.deleteUser(id.user._id);
        const message = deleteData.message;
        if(message.msgError){
            this.setState({message});
        }
        else{
            const data = await UserAPI.getUser();
            this.setState({message,users : data})
        }
    }

    async updateHandler(e){
        e.preventDefault();
        const updateData = await UserAPI.updateUser(this.state.user);
        const message = updateData.message;
        if(message.msgError){
            this.setState({message});
        }
        else{
            const data = await UserAPI.getUser();
            this.setState({message,users : data})
        }
        this.setState({isEditForm:false});
        this.resetForm();
    }

    async addHandler(e){
        e.preventDefault();
        const postData = await UserAPI.createUser(this.state.user);
        const message = postData.message;
        if(message.msgError){
            this.setState({message});
        }
        else{
            const data = await UserAPI.getUser();
            this.setState({message,users : data})
        }
        this.resetForm();
    }

    renderUserTable(){
        {/*console.log("Here First")
    console.log(this.state.users)*/}
        if(this.state.users.length > 0){
            return(
                <UserTable users = {this.state.users} 
                           deleteHandler={this.deleteHandler} 
                           showEditForm={this.showEditForm}/>
            );
        }
        return null;
    }

    renderForm(){
        return(
            <Form isEditForm={this.state.isEditForm}
                  user={this.state.user}
                  handleChange={this.handleChange}
                  handler={!this.state.isEditForm ? this.addHandler : this.updateHandler}/>
        );
    }

    renderNavbar(){
        return(
            <Navbar/>
        );
    }

    renderMessage(){
        if(this.state.message === "")
            return null;
        return(
            <Message message={this.state.message}/>
        );
    }

    render(){
        if(location==='Home'){
            return(
                <div className="row">
                    <div className="col"></div>
                    <div className="col-10">
                        {this.renderNavbar()}
                        {this.renderUserTable()}
                        {this.renderForm()}
                        {this.renderMessage()}
                    </div>
                    <div className="col"></div>
                </div>
            )
        }
    }
}

export default App;