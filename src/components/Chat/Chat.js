import React, { Component } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import { connect } from 'react-redux';
import ChatBox from './ChatBox/Chatbox';
import chaticon from './../../images/chaticon.png';

// import axios from 'axios';

const socket = io('http://localhost:3005')



class Chat extends Component {
  constructor(){
    super();
    this.state = {
        user: '',
        users: [],
        message: '',
        messages: []
    }
  }

    componentDidMount = () => {
    //     axios.get('/api/users-data').then(res => {
    //         this.setState({users: res})
    // });
        
        socket.on(`message dispatched`, data => {
            const messages = [ ...this.state.messages, data]
            this.setState({messages})
        })
        
        socket.on('welcome', this.setUserId)
      }

    
      setUserId = (user) => {
        this.setState(user)
      }
    
      sendMessage = () => {
          var obj = {
            id: this.props.user.id,
            user_name: this.props.user.user_name,
            user_pic: this.props.user.user_pic,
            message: this.refs.message.value
          }
        socket.emit('message sent', obj)
        this.refs.message.value = '';
      }

      keyPress = (e) => {
          if(e.keyCode === 13){
              this.sendMessage();
          }
      }
  

  render(){
     
    const messages = this.state.messages.map((e, i) => {


        return (
            <ChatBox
            key = {i} 
            userObj = {e}
            messageUser = {e.id}
            messageUserPic = {e.user_pic}
            messageUserName = {e.user_name}
            currentUser = {this.props.user.id}
            username = {this.props.user.user_name}
            userpic = {this.props.user.user_pic} 
            />
        )
      })
   
    
  
    return (
      
      
      
      <div className = 'chat'>
            <div className="messages">
                { messages[0] ? messages : null}
            </div>
        <div className="input">
          <input className='chatinput' onKeyDown={this.keyPress} onChange = {(e) => {this.setState ({ message: e.target.value })}} ref = 'message' placeholder = 'Enter Message'/>
          {/* <button className = 'chatbutton' onClick={this.sendMessage}>Send</button> */}
          <img className = 'send' onClick={this.sendMessage} src={chaticon} alt=""/>
        </div>
        
      </div>
    );
  
}


}

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Chat);


