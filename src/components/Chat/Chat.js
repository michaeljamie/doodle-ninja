import React, { Component } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import { connect } from 'react-redux';
import ChatBox from './ChatBox/Chatbox';
import chaticon from './../../images/chaticon.png';
import axios from 'axios';


const socket = io()



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
        socket.on(`message dispatched-${this.props.doodleName}`, data => {
            console.log('frontend receiving data =', data)
            const messages = [ ...this.state.messages, data]
            this.setState({messages})
        })


        axios.get('/api/user-data').then(res => {
            this.setState({users: res})
    });
    // `chat-${this.props.user.currentdoodleid}`

        
        socket.on('welcome', this.setUserId)
      }

    
      setUserId = (user) => {
        this.setState(user)
      }
    
      sendMessage = () => {
          console.log('chatsend=', this.props.doodleName)
          var obj = {
            id: this.props.user.id,
            user_name: this.props.user.user_name,
            user_pic: this.props.user.user_pic,
            message: this.refs.message.value,
            currentdoodleid: this.props.doodleName
          }
        socket.emit('message sent', obj)
        this.refs.message.value = '';
      }

      keyPress = (e) => {
          if(e.keyCode === 13){
              this.sendMessage();
          }
      }

      scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    
    componentDidUpdate() {
        this.scrollToBottom()
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
            <div ref={(div) => { this.messageList = div }} className="messages">
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
        user: state.user,
        doodleName: state.doodleName
    };
}

export default connect(mapStateToProps)(Chat);
