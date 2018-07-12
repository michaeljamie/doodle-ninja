import React, { Component } from 'react';
import { getUserData, updateUserData } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Editprofile.css';
import { Link } from 'react-router-dom';

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
            this.props.updateUserData(this.state)
        })  
    }

    deleteUser = () => {
        axios.delete('api/delete')
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
           <div>
               <h3>Dashboard</h3>
               { user.user_pic ? <img src = {user.user_pic} alt = ''/> : null }
               <h4>Profile Picture:</h4>
               <input type="text" onChange = {(e) => {this.handleChange('user_pic', e.target.value)}} placeholder = 'Profile Picture URL' value = {this.state.user_pic}/>
               <h4>Username:</h4>
               <input type="text" onChange = {(e) => {this.handleChange('user_name', e.target.value)}} placeholder = 'Username' value = {this.state.user_name}/>
               <Link to='/dashboard'><button onClick = {() => this.updateUser(this.state)} >Update Profile</button></Link>
                <br />

               <Link to='/'><button onClick = {() => this.deleteUser()}>Delete Profile</button></Link>

        
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