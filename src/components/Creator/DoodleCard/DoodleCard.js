import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './DoodleCard.css';
import joinblue from './../../../images/joinblue.png'

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


    render (){
        if(this.state.redirect){
            return <Link to = '/canvas'/>
        }
        return (
            <div className = 'doodlecard'>
                <h2 className = 'doodlecardtext'>
                    Doodle Name: {this.props.doodleObj.doodleid}
                </h2>
                <h2 className = 'doodlecardtext'>
                    Created By: {this.props.doodleObj.user_name}
                </h2>
                <input type="password" className = 'createinput' onChange = {(e) => {this.handleChange('input', e.target.value)}} placeholder = 'Password' value = {this.state.input}/>
                <button className = 'doodlejoin'> <img src={joinblue} className = 'joindoodleicon' alt=""/> Join</button>
            </div>
        )
    }

};

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(DoodleCard);

