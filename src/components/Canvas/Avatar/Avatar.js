import React from 'react';
import './Avatar.css';


export default function Avatar(props){
    
    var avatarDisplay
    if(props.currentUserDoodle === props.userObj.currentdoodleid){
        avatarDisplay = (


            <div className = 'userAvatars'> 
                <img src={props.userObj.user_pic} className = 'userAvatar' alt=""/>
            </div>
          
                        
        


            // <div className = 'chatmsg'>
            //     <img src={props.userpic ? props.userpic : avatar } alt="avatar" className = 'avatar'/>
            //     <div>
            //     <div className='chattext'><p>{props.messageUserName ? props.messageUserName : 'Anonymous User' }:</p></div>
            //     <div className='chatmessage'><p>{props.userObj.message}</p></div>
            //     </div>
                
            // </div>
            
        )
    } else {
        avatarDisplay = (

            <div className = 'userAvatars'> 
                
            </div>
            // <div className = 'chatmsg1'>
            //     <img src={props.messageUserPic ? props.messageUserPic : avatar } alt="avatar" className = 'avatar'/>
            //     <div>
            //         <div className='chattext'><p>{props.messageUserName ? props.messageUserName : 'Anonymous User' }:</p></div>
            //         <div className='chatmessage'><p>{props.userObj.message}</p></div>
            //     </div>
                
            // </div>
        )
    }
    return (
        <div>
            {avatarDisplay}
        </div>
    )
}