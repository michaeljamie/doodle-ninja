import React, { Component } from 'react';
import { getUserData, updateUserData } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Editprofile.css';
import { Link } from 'react-router-dom';
import avatar from './../../images/avatar.jpg';

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            user_name: props.user.user_name,
            user_pic: props.user.user_pic
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user_name: nextProps.user.user_name,
            user_pic: nextProps.user.user_pic
        })
    }

    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
    });
    }



    updateUser = (obj) => {
        axios.post('/api/update', obj)
        .then( () => {
            console.log(obj)
            this.props.updateUserData(obj)
        })  
    }

    deleteUser = () => {
        axios.delete('/api/delete')
    }

    handleChange(property, value) {
                this.setState({
              [property]: value
            })
          }

    logout = () => {
        axios.get('/api/logout')
    }
    
    render(){
        let { user } = this.props
        

        return(
            <div className = 'editboard'>
                <div className = 'editcard'>
                    <div className = 'edittop'>
                        <img src = { user.user_pic ? user.user_pic : avatar } className = 'dashpic' alt = 'profilepic'/>  
                        <h4 className = 'user-name1'>Profile Picture:</h4>
                        <input className = 'editinput' type="text" onChange = {(e) => {this.handleChange('user_pic', e.target.value)}} placeholder = 'Profile Picture URL' value = {this.state.user_pic}/>
                        <h4  className = 'user-name1'>Username:</h4>
                        <input className = 'editinput' type="text" onChange = {(e) => {this.handleChange('user_name', e.target.value)}} placeholder = 'Username' value = {this.state.user_name}/>
                    </div>
                    <Link to='/dashboard'><button className = 'dashbutton' onClick = {() => this.updateUser(this.state)} >Update Profile</button></Link>
                    <Link to='/dashboard'><button className = 'dashbutton'>Back to Dashboard</button></Link>
                    <Link to='/'><button className = 'editbutton' onClick = {() => this.deleteUser()}>Delete Profile</button></Link>
                </div>
        
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {getUserData, updateUserData})(Dashboard);