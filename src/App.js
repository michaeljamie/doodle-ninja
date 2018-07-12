import React, { Component } from 'react';
import routes from './routes';
import Nav from './components/Nav/Nav';
import './reset.css';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
     
    }
  }




  render() {
    const currentPath = window.location.href
  
    return (
      
      
      
      <div>
        {currentPath === 'http://localhost:3000/#/' ? '' : <Nav />  }
        {routes}
        
      </div>
    );
  }
}

export default App;
