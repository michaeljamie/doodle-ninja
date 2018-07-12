import React, { Component } from 'react';
import { getUserData, newDoodle } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Creator.css';
import { Link } from 'react-router-dom';



class Creator extends Component {
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
  
    handleChange = (property, value) => {
        this.setState({
      [property]: value
    })
    }

    createDoodle = (obj) => {
        axios.post('/api/createdoodle', obj)
        .then( () => this.props.newDoodle(this.state))
    }
    

    logout = () => {
        axios.get('/api/logout')
    }
    
    render(){
        let { user } = this.props
        

        return(
           <div>
               <h3>Create New Doodle:</h3>
               <input type="text" onChange = {(e) => {this.handleChange('doodleId', e.target.value)}} placeholder = 'Doodle Name' />
               <input type="text" onChange = {(e) => {this.handleChange('doodlepassword', e.target.value)}} placeholder = 'Password' />
               <Link to='/canvas'><button onClick = {() => this.createDoodle(this.state)}>Create</button></Link>
   
           </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {getUserData, newDoodle})(Creator);