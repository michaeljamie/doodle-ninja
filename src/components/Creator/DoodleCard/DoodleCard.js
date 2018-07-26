import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newDoodle, joinDoodle } from './../../../ducks/reducer';
import { Redirect } from 'react-router-dom';
import './DoodleCard.css';
import joinblue from './../../../images/joinblue.png';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';

const socket = io()

class DoodleCard extends Component{
    constructor(){
        super();
        this.state = {
            input: '',
            redirect: false,
            display: false
        }
    };

    handleChange = (property, value) => {
        this.setState({
      [property]: value
    })
    }

    joinExistingDoodle = () => {
        if(this.state.input === this.props.doodleObj.doodlepassword) {
            this.setState({input: '', redirect: true})
            this.props.joinDoodle({user_name: this.props.user.user_name, doodleId: this.props.doodleObj.doodleid})
            
        } else {
            this.setState({input: ''});
            this.passFail();
        }
    }

    keyPress = (e) => {
        if(e.keyCode === 13){
            this.joinExistingDoodle();
        }
    }

    passFail = () => toast.error('💩 Invalid Password 👎🏼', {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });


    render (){
        if(this.state.redirect){
            return <Redirect push to = '/canvas'/>
        }
        return (
            <div className = 'doodlecard'>
                <h2 className = 'doodlecardtext'>
                    Doodle Name: {this.props.doodleObj.doodleid}
                </h2>
                <h2 className = 'doodlecardtext'>
                    Created By: {this.props.doodleObj.user_name}
                </h2>
                <input type="password" onKeyDown={this.keyPress} className = 'createinput' onChange = {(e) => {this.handleChange('input', e.target.value)}} placeholder = 'Password' value = {this.state.input}/>
                <button className = 'doodlejoin' onClick = {this.joinExistingDoodle}> <img src={joinblue} className = 'joindoodleicon' alt=""/> Join</button>
                <ToastContainer
                                position="top-center"
                                autoClose={3500}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnVisibilityChange
                                draggable
                                pauseOnHover
                            />
            </div>

        )
    }

};

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {newDoodle, joinDoodle})(DoodleCard);

