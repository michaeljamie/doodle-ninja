import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import ninja from './../../images/ninja.png';
import ninjablack from './../../images/ninjablack.png';
import facebooklogo from './../../images/facebooklogo.png';
import twitterlogo from './../../images/twitterlogo.png';
import instagramlogo from './../../images/instagramlogo.png';
import menuicon from './../../images/menuicon.png';
import create from './../../images/create.png';
import settings from './../../images/settings.png';
import logout from './../../images/logout.png';
import './Nav.css';

class Nav extends Component {
    constructor(){
        super();
        this.state = {
            anchorEl: null
    }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render(){
        let { user } = this.props
        const { anchorEl } = this.state;
        return (
            <div className = 'navigation'>
                <div>
                        <Button
                        aria-owns={anchorEl ? 'fade-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                    <img className = 'menulogo' src={menuicon} alt=""/>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                        TransitionComponent={Fade}
                    >
                    <Link className = 'link' to='/dashboard'><MenuItem className = 'link' onClick={this.handleClose}><img className = 'menuicon' src={ninjablack} alt=""/> Dashboard</MenuItem></Link>
                    <Link className = 'link' to='/creator'><MenuItem className = 'link' onClick={this.handleClose}> <img className = 'menuicon' src={create} alt=""/>Find Doodles</MenuItem></Link>
                    <Link className = 'link' to='/'><MenuItem className = 'link' onClick={this.handleClose}> <img className = 'menuicon' src={logout} alt=""/> Logout</MenuItem></Link>
                    </Menu>
                </div>
                
                     <Link to='/' className = 'link'>
                        <div className = 'navlogo'>
                            <img className = 'navlogo' src={ninja} alt=""/>
                            <h1 className = 'navwelcome'>Doodle Ninja</h1>
                        </div>
                    </Link>
                <div>
                    <a href="http://www.facebook.com"><img className = 'social' src={facebooklogo} alt=""/></a>
                    <a href="http://www.twitter.com"><img className = 'social2' src={twitterlogo} alt=""/></a>
                    <a href="http://www.instagram.com"><img className = 'social' src={instagramlogo} alt=""/></a> 
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

export default connect(mapStateToProps)(Nav);


