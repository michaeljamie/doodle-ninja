import React, { Component } from 'react';
import routes from './routes';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import './reset.css';
import './App.css';





export default class App extends Component {
  constructor(){
    super();
    this.state = {
     loading: true
    }
  }

  componentDidMount = () => {
    setTimeout(()=>
    this.setState({loading: false}), 1500
    )
    
  }




  render() {
    const currentPath = window.location.href
  
    return (
      
      
      
      <div>
        {(this.state.loading) ?  
          <Loading />
        :
          <div>
            {currentPath === 'http://localhost:3000/#/' ? '' : <Nav />  }
            {routes}
            {currentPath === 'http://localhost:3000/#/canvas' ? '' : <Footer />  }
          </div>}
      </div>
    );
  }
}

