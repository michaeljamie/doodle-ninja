import React, { Component } from 'react';
import { getUserData, newDoodle, joinDoodle } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Creator.css';
import { Redirect } from 'react-router-dom';
import DoodleCard from './DoodleCard/DoodleCard';
import createwhite from './../../images/createwhite.png';
import createblue from './../../images/createblue.png';
import doodleidea from './../../images/doodleidea.png';
import checkblue from './../../images/checkblue.png';



class Creator extends Component {
    constructor(){
        super();

        this.state = {
            doodleId: '',
            doodlePassword: '',
            doodles: []
        }
    }
    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
    });
        axios.get('/api/doodles').then(res => {
            this.setState({doodles: res.data})
    });
    }
  
    handleChange = (property, value) => {
        this.setState({
      [property]: value
    })
    }

    createDoodle = () => {
        if(this.state.doodleId && this.state.doodlePassword){
            const doodleObj = {
                doodleId: this.state.doodleId,
                doodlePassword: this.state.doodlePassword
            }
            axios.post('/api/createdoodle', doodleObj)
            .then( res => {this.props.joinDoodle({user_name: this.props.user.user_name, doodleId: this.state.doodleId})})
            .catch(e => console.log(e))
            this.setState({doodleId: '', doodlePassword: '', redirect: true})
        }     
    }

    keyPress = (e) => {
        if(e.keyCode === 13){
            this.createDoodle();
        }
    }
    

    logout = () => {
        axios.get('/api/logout')
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect push to = '/canvas'/>
        }
        let { user } = this.props
        const doodleArr = this.state.doodles.map((e, i) => {
            return (
                <DoodleCard
                key ={e.id}
                username = {user.username}
                doodleObj = {e}
                />
            )
        })
        

        return(
           <div className = 'creator'>
                <div className = 'creatorcard'>
                    <div className = 'cctop'>
                    <h3 className = 'creatortitle'>Create Doodle</h3>
                    </div>
                    <input type="text" className = 'createinput' onChange = {(e) => {this.handleChange('doodleId', e.target.value)}} placeholder = 'Doodle Name' value = {this.state.doodleId}/>
                    <input type="password" onKeyDown={this.keyPress} className = 'createinput' onChange = {(e) => {this.handleChange('doodlePassword', e.target.value)}} placeholder = 'Password' value = {this.state.doodlePassword}/>
                    <button  className = 'dashbutton' onClick = {() => this.createDoodle()}><img className = 'dashicon' src={createwhite} alt=""/><img className = 'imagehover' src={createblue} alt=""/>Create</button>
                    
                    <div className = 'createbottom'>
                        
                        <img src={doodleidea} className = 'ideacreate' alt=""/>
                        <div className = 'doodlelist'>
                           
                                <div className = 'checkitem'>
                                <img src={checkblue} className = 'checkblue' alt=""/>
                                <p>Start a private doodle accessed only by those within your organization.</p>
                                </div>
                                <div className = 'checkitem'>
                                <img src={checkblue} className = 'checkblue' alt=""/>
                                <p>Utilize live-chat, multiple design tools, and save your doodles for future reference.</p>
                                </div>
                                <div className = 'checkitem'>
                                <img src={checkblue} className = 'checkblue' alt=""/>
                                <p>Stay on the same page regardless of location and timezones.</p>
                                </div>
                            
                        </div>
                    </div>
                </div>
                <div className = 'creatorcard1'>
                    <div className = 'cctop'>
                        <h3 className = 'creatortitle'>Join Doodle</h3>
                    </div>
                        <div className = 'currentdoodles'>
                            {doodleArr}
                        </div>
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

export default connect(mapStateToProps, {getUserData, newDoodle, joinDoodle})(Creator);