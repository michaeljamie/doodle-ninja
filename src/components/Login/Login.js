import React from 'react';
import './Login.css';
import ninja from './../../images/ninja.png';
import facebooklogo from './../../images/facebooklogo.png';
import twitterlogo from './../../images/twitterlogo.png';
import instagramlogo from './../../images/instagramlogo.png';
import arrow from './../../images/arrow.png';
import foto1 from './../../images/foto1.jpg';
import foto2 from './../../images/foto2.jpg';
import foto3 from './../../images/foto3.jpg';
import foto4 from './../../images/foto4.jpg';
import createblue from './../../images/createblue.png';
import collaborateblue from './../../images/collaborateblue.png';
import integrateblue from './../../images/integrateblue.png';
import bluechevron from './../../images/bluechevron.png';
// import bkgd from './../../images/bkgd.jpg';
// import Particles from 'react-particles-js';


export default function Login(){



function login(){
    let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

    let redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);

    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
}

    return(
        <div>
            <div className="Login">
            {/* <Particles 
              params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
            		}
            	}}
              style={{
                width: '100%',
                backgroundImage: `url(${bkgd})` 
              }}
            /> */}
                <div className = 'topnav'>
                    <div>
                    <a href="http://www.facebook.com"><img className = 'social' src={facebooklogo} alt=""/></a>
                    <a href="http://www.twitter.com"><img className = 'social2' src={twitterlogo} alt=""/></a>
                    <a href="http://www.instagram.com"><img className = 'social' src={instagramlogo} alt=""/></a> 
                    </div>
                    <div className='navmid'>
                        <img className = 'navlogo' src={ninja} alt=""/>
                        <h1 className = 'welcome'>Doodle Ninja</h1>
                    </div>
                    
                    <div className='navmid'>
                        <a onClick={login}><h3 className = 'welcome1'>ABOUT</h3></a>
                        <a onClick={login}><h3 className = 'welcome1'>LOGIN</h3></a>
                
                    </div>  
                </div>
                <div className = 'loginhead'>
                    <h1 className = 'logintitle'>Sync with Team Members Worldwide.</h1>
                    <h2 className = 'loginsubtitle'>The collaborative whiteboarding tool that's bringing teams together.</h2>
                    <button className = 'LoginButton' onClick={login}><span>See it in action</span></button>
                </div>
                <div>
                    <img src={arrow} className = 'arrowlogin' alt=""/>
                </div>
            </div>
            <div className = 'collabtools'>
                <div>
                   <h2 className = 'bartitle'>Collaborative Tools for Every Team:</h2> 
                </div>
                <div className = 'bar'>
                    <a href=""><div className = 'fotocontainer1'>
                        <img className = 'fotologin' src={foto1} alt=""/>
                        <div className = 'fototext'><h3>Managers</h3></div>
                    </div></a>
                    <a href=""><div className = 'fotocontainer2'>
                    <img className = 'fotologin' src={foto2} alt=""/>
                        <div className = 'fototext'><h3>Developers</h3></div>
                    </div></a>
                    <a href=""><div className = 'fotocontainer3'>
                        <img className = 'fotologin' src={foto3} alt=""/>
                        <div className = 'fototext'><h3>Teachers</h3></div>
                    </div></a>
                    <a href=""><div className = 'fotocontainer4'>
                        <img className = 'fotologin' src={foto4} alt=""/>
                        <div className = 'fototext'><h3>Designers</h3></div>
                    </div></a>
                </div>
               <div className = 'bottombar'>
                    <div className = 'barsection'>
                        <div className = 'barcray'>
                            <img src={createblue} className = 'baricon' alt=""/>
                            <h2 className = 'lowerbartitle'>Create</h2>
                        </div>
                        <h3 className = 'createlower'>
                            Ideate, share, and visualize ideas with our helpful tools and features.  Once you're finished save and share the doodle with your team.
                        </h3>
                    </div>
                    <div className = 'barsection'>
                        <div className = 'barcray'>
                            <img src={collaborateblue} className = 'baricon' alt=""/>   
                            <h2 className = 'lowerbartitle'>Collaborate</h2>
                        </div>
                        <h3 className = 'createlower'>
                            Coordinate and collaborate the best ideas with your team.  Real-time chat communication ensures everyone is on the same page and participating.
                        </h3>
                    </div>
                    <div className = 'barsection'>
                        <div className = 'barcray'>
                            <img src={integrateblue} className = 'baricon' alt=""/>
                            <h2 className = 'lowerbartitle'>Integrate</h2>
                        </div>
                        <h3 className = 'createlower'>
                            Integrate in real time with your teams across the globe.  Work together as efficiently as if you're in the same room and timezone.
                        </h3>
                    </div>
                   
                   
                   
               </div>
           
            </div>
            <div className = 'scrollbar'>
                <h1 className = 'scrolltitle'>Create a Free Account Today</h1>
                <button className = 'LoginButton' onClick={login}><span>Sign Up Now</span></button>

            </div>
            <div className = 'lowerbar'>
                <div className = 'lbtop'>
                    <div className = 'lowerright'>
                        <h2 className = 'lowertitle'>Useful Tools To Transform Ideas to Reality</h2>
                        <div className = 'splitlower'>
                            <img src={bluechevron} className='chevron' alt=""/>
                            <h3 className = 'lowersubtitle'>All users can interact and work together in editing the canvas and team designs and plans.</h3>
                        </div>
                        <div className = 'splitlower'>
                            <img src={bluechevron} className='chevron' alt=""/>
                            <h3 className = 'lowersubtitle'>Team members can save and keep the canvas in order to further integrate at another time.</h3>
                        </div>
                    </div>
                    <div className = 'lowercanvas'></div>
                    {/* <img className = 'lowercanvas' src={canvasexample} alt=""/> */}
                </div>
                <div  className = 'lbbottom'>
                    <div className = 'lowerchat'></div>
                    {/* <img className = 'lowerchat' src={chat} alt=""/> */}
                    <div className = 'lowerright'>
                        <h2 className = 'lowertitle'>Integrated Chat Helps Organize Your Doodles</h2>
                        <div className = 'splitlower'>
                            <img src={bluechevron} className='chevron' alt=""/>
                            <h3 className = 'lowersubtitle'>Keep your team members engaged with live updates and discussion happening simultaneously.</h3>
                        </div>
                        <div className = 'splitlower'>
                            <img src={bluechevron} className='chevron' alt=""/>
                            <h3 className = 'lowersubtitle'>Discuss changes and design in real time as your team collaborates on whatever project you start.</h3>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
} 