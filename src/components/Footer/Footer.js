import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';
import ninja from './../../images/ninja.png';
import facebooklogo from './../../images/facebooklogo.png';
import twitterlogo from './../../images/twitterlogo.png';
import instagramlogo from './../../images/instagramlogo.png';


export default function Footer (){

    return (
        <div className = 'sitefooter'>
            <Link to='/' className = 'link'>
                <div className = 'footlogo'>
                    <img className = 'footlogo' src={ninja} alt=""/>
                    <h1 className = 'footwelcome'>Doodle Ninja</h1>
                </div>
            </Link>
            <div>

            </div>
            <div>
                <h3 className = 'footfollow'>Follow:</h3>
                    <a href="http://www.facebook.com"><img className = 'social' src={facebooklogo} alt=""/></a>
                    <a href="http://www.twitter.com"><img className = 'social2' src={twitterlogo} alt=""/></a>
                    <a href="http://www.instagram.com"><img className = 'social' src={instagramlogo} alt=""/></a> 
       
            </div>
            
        </div>
    )
}