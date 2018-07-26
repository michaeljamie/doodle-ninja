import React, { Component } from 'react';
import { getUserData, newDoodle } from './../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DrawingCard from './DrawingCard/DrawingCard';
import avatar from './../../images/avatar.jpg';
import logoutwhite from './../../images/logoutwhite.png';
import logoutblue from './../../images/logoutblue.png';
import editwhite from './../../images/editwhite.png';
import editblue from './../../images/editblue.png';
import createwhite from './../../images/createwhite.png';
import createblue from './../../images/createblue.png';
import emailwhite from './../../images/emailwhite.png';


class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            doodleId: '',
            doodlePassword: '',
            formname: '',
            formemail: '',
            formsubject: '',
            formmessage: '',
            drawings: []
        }
    }
    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
            
    });
        axios.get('/api/drawings').then(res => {
            
            this.setState({drawings: res.data})
     
    });
    }

    deleteDrawing = (id) => {
        axios.delete(`/api/deleteDrawing/${id}`).then(res => {
            console.log(res.data)
            this.setState({drawings: res.data})
        })
    }



    
    handleChange = (property, value) => {
        this.setState({
      [property]: value
    })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {formname, formemail, formsubject, formmessage} = this.state;

        axios.post('./api/send', {
           formname,
           formemail,
           formsubject,
           formmessage 
        });
        this.setState({
            formname: '',
            formemail: '',
            formsubject: '',
            formmessage: ''
        })
        this.notify();
    }
  
    notify = () => toast.success('✉️ Contact Form Sent ✉️', {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });

    logout = () => {
        axios.get('/api/logout')
    }
    
    render(){
        let { user } = this.props
        const drawingArr = this.state.drawings.map((e, i) => {
            return (
                <DrawingCard
                key ={e.id}
                id = {e.id}
                drawing = {e.dataurl}
                delete = {() => {this.deleteDrawing(e.id)}}
                />
            )
        })
        return(
            <div className = 'dashpage'>
                <div className = 'dashcard'>
                        <div className = 'dashtop'>
                            <img src = { user.user_pic ? user.user_pic : avatar } className = 'dashpic' alt = 'profilepic'/>
                            <h4 className = 'user-name'>{ user.user_name ? user.user_name : 'username' }</h4>
                        </div>    
                            
                            <Link className = 'link' to='/editprofile'><button className = 'dashbutton'><img className = 'dashicon' src={editwhite} alt=""/><img className = 'imagehover' src={editblue} alt=""/> Edit Profile</button></Link>
                            <Link className = 'link' to='/creator'><button className = 'dashbutton'><img className = 'dashicon' src={createwhite} alt=""/><img className = 'imagehover' src={createblue} alt=""/>Find Doodles</button></Link>
                            <Link className = 'link' to='/'><button className = 'dashbutton' onClick={this.logout}><img className = 'dashicon' src={logoutwhite} alt=""/><img className = 'imagehover' src={logoutblue} alt=""/> Logout</button></Link>
                    
                    
                </div>
                <div className = 'dashboard'>
                    <div className = 'drawcard'>
                        <div className = 'drawcardtop'>
                            <h3 className = 'drawingtitle'>My Saved Doodles</h3>
                        </div>
                            <div className = 'currentdrawings'>
                                {drawingArr}
                            </div>
                    </div> 
                    
                    <div className = 'dashcardright'>
                        <div className = 'dashrighttop'>
                                <img className = 'eicon' src={emailwhite} alt=""/>
                                <h4 className = 'user-name'>Contact Us</h4>
                        </div>
                            <input type="text" className = 'dashinput' onChange = {(e) => {this.handleChange('formname', e.target.value)}} placeholder = 'Name' value = {this.state.formname}/>
                            <input type="text" className = 'dashinput' onChange = {(e) => {this.handleChange('formemail', e.target.value)}} placeholder = 'Email Address' value = {this.state.formemail}/>
                            <input type="text" className = 'dashinput' onChange = {(e) => {this.handleChange('formsubject', e.target.value)}} placeholder = 'Your Subject' value = {this.state.formsubject}/>
                            <input type="text" className = 'dashinput' onChange = {(e) => {this.handleChange('formmessage', e.target.value)}} placeholder = 'Your Message' value = {this.state.formmessage}/>
                            <button className = 'dashbutton' onClick = {this.handleSubmit}>Send</button>
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

export default connect(mapStateToProps, {getUserData})(Dashboard);