import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class Nav extends Component {
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
        const { anchorEl } = this.state;
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                Menu
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                <Link to='/dashboard'><MenuItem onClick={this.handleClose}>Dashboard</MenuItem></Link>
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <Link to='/creator'><MenuItem onClick={this.handleClose}>Create</MenuItem></Link>
                <Link to='/'><MenuItem onClick={this.handleClose}>Logout</MenuItem></Link>
                </Menu>
      </div>
        )
  }
}


