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
    this.setState({loading: false})
  }




  render() {
    const currentPath = window.location.href
  
    return (
      
      
      
      <div>
        {(this.state.loading) ?  
          <Loading />
        :
          <div>
            {currentPath === `${window.origin}/#/` ? '' : <Nav />  }
            {routes}
            {currentPath === `${window.origin}/#/canvas` ? '' : <Footer />  }
          </div>}
      </div>
    );
  }
}

