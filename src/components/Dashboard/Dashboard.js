import React, { Component } from 'react';
import { getUserData, newDoodle } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Dashboard.css';
import { Link } from 'react-router-dom';



class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            doodleId: '',
            doodlepassword: ''
        }
    }
    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
    });
    }

    componentDidUpdate(prevProps){
        let flag = false;
        for (const prop in this.props){
            if (this.props[prop] !== prevProps[prop]){
                flag = true;
            }
        }
        if (flag){
            axios.get('/api/user-data').then(res => {
                this.props.getUserData(res.data)
            })
        }
    }

    
    handleChange = (property, value) => {
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
           <div className = 'dashboard'>
               <div className = 'dashcard'>
                    <img src = { user.user_pic ? user.user_pic : null } className = 'dashpic' alt = 'profilepic'/>
                    
                    <h4>{ user.user_name ? user.user_name : 'username' }</h4>
                    <Link to='/editprofile'><button>Edit Profile</button></Link>
               </div>
               <Link to='/creator'><button>Create New Doodle</button></Link>
               <br/>
                   <Link to='/'><button onClick={this.logout}>Logout</button></Link>
                
               
           </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {getUserData})(Dashboard);