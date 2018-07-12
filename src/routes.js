import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Canvas from './components/Canvas/Canvas';
import Chat from './components/Chat/Chat';
import Editprofile from './components/Editprofile.js/Editprofile';
import Creator from './components/Creator/Creator';


export default (
    <Switch>
        <Route component = {Login} exact path= '/'/>
        <Route component = {Dashboard} path='/dashboard'/>
        <Route component = {Canvas} path='/canvas'/>
        <Route component = {Chat} path='/chat'/>
        <Route component = {Editprofile} path = '/editprofile'/>
        <Route component = {Creator} path = '/creator'/>
    </Switch>
)