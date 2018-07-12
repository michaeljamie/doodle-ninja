import React from 'react';
import './Chatbox.css';

export default function ChatBox(props){
    console.log(5555555, props)
    var box
    if(props.currentUser === props.messageUser){
        box = (
            <div className = 'chatmsg'>
                <img src={props.userpic} alt="avatar" className = 'avatar'/>
                <div>
                <div className='chattext'><p>{props.messageUserName}:</p></div>
                <div className='chatmessage'><p>{props.userObj.message}</p></div>
                </div>
            </div>
        )
    } else {
        box = (
            <div className = 'chatmsg1'>
                <img src={props.messageUserPic} alt="avatar" className = 'avatar'/>
                <div>
                    <div className='chattext'><p>{props.messageUserName}:</p></div>
                    <div className='chatmessage'><p>{props.userObj.message}</p></div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {box}
        </div>
    )
}

//// <p key={i} style={styles} ><div className = 'chatmsg'> <img src={`   ${ this.props.user.user_pic}`} alt="" className = 'avatar'/><div className='chattext'>{`${ this.props.user.user_name}: ${e.message }`} </div></div> </p>