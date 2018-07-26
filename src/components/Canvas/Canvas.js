import React, { Component } from 'react';
import SketchPad from './Tools/SketchPad';
import {TOOL_PENCIL} from './Tools/Pencil';
import {TOOL_LINE} from './Tools/Line';
import {TOOL_RECTANGLE} from './Tools/Rectangle';
import {TOOL_ELLIPSE} from './Tools/Ellipse';
import {TOOL_ERASER} from './Tools/Eraser';
import axios from 'axios';
import { getUserData } from './../../ducks/reducer';
import Chat from './../Chat/Chat';
import { connect } from 'react-redux';
import './Canvas.css';
import io from 'socket.io-client';
import pencilicon from './../../images/pencilicon.png';
import erasericon from './../../images/erasericon.png';
import squareicon from './../../images/squareicon.png';
import lineicon from './../../images/lineicon.png';
import circleicon from './../../images/circleicon.png';
import coloricon from './../../images/coloricon.png';
import sizeicon from './../../images/sizeicon.png';

//comment

const socket = io()




class Canvas extends Component {



  constructor(props){
    super(props);
    this.state = {
        doodleid: 'doodleId',
        tool:TOOL_PENCIL,
        size: 2,
        color: '#252525',
        fill: false,
        fillColor: '#252525',
        items: [],
        drawing: false,
        currentArtistPic: ''
    }




  }

  componentDidMount = () => {
    axios.get('/api/user-data').then(res => {
      this.props.getUserData(res.data)
  });
    axios.get('/api/doodles').then(res => {
      this.setState({doodles: res.data})
  });
    socket.on(`addItems`, response => {
 
      const {i, sockcurrentdoodleid, sockusername, sockuserpic} = response;
      this.setState({currentArtistPic: sockuserpic})
      this.setState({ drawing: true })
      this.setState({items: this.state.items.concat([i])})
      
    } );
}

  
  
  
 
  
  

  render() {
    const { tool, size, color, fill, fillColor, items } = this.state;
    var TOOL_COLOR;
    var TOOL_SIZE;
  
    return (
      
      
      
        
        <div  className = 'canvasbody'>
          <div className = 'canvasleft'>
          <div className = 'toolscanvas'>
            <div className="tools" style={{marginBottom:20}}>

              <img className = 'pencil' onClick={() => this.setState({tool:TOOL_PENCIL})} src={pencilicon} alt="pencil"/>
              <img className = 'pencil' onClick={() => this.setState({tool:TOOL_ERASER})} src={erasericon} alt=""/>
              <img className = 'pencil' onClick={() => this.setState({tool:TOOL_RECTANGLE})} src={squareicon} alt=""/>
              <img className = 'pencil' onClick={() => this.setState({tool:TOOL_LINE})} src={lineicon} alt=""/>
              <img className = 'pencil' onClick={() => this.setState({tool:TOOL_ELLIPSE})} src={circleicon} alt=""/>            
                <div className = 'othertools'>
                  <div className = 'slidecolor'>
                    <div className="canvassize">
                      <img className = 'pencil' src={sizeicon} onClick={() => this.setState({tool:TOOL_SIZE})} alt=""/>
                      {/* {(this.state.tool === TOOL_SIZE) ? : '' } */}
                      <div className = 'growslider'><input className = 'slider' min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: Number(e.target.value)})} /></div>
                    </div>
                    <div className="canvascolor">          
                      
                    <img className = 'pencil' src={coloricon} onClick={() => this.setState({tool:TOOL_COLOR})} alt=""/>
                      <br/>
                      {/* {(this.state.tool === TOOL_COLOR) ? : '' } */}
                      <input className = 'colorselect' type="color" value={color} onChange={(e) => this.setState({color: e.target.value})} />
                    </div>
                  </div>
                  
                  {(this.state.tool === TOOL_ELLIPSE || this.state.tool === TOOL_RECTANGLE) ?
                    <div className = 'optionaltools'>
                      <label className = 'optionstext' htmlFor="">Fill:</label>
                      <input className = 'toolcheck' type="checkbox" value={fill} style={{margin:'0 8'}}
                            onChange={(e) => this.setState({fill: e.target.checked})} />
                      {fill ? <span className="canvascolor">
                        <div className = 'optionaltools'>
                            <label className = 'optionstext' htmlFor="">Color:</label>
                            <br/>
                            <input className = 'colorselect' type="color" value={fillColor} onChange={(e) => this.setState({fillColor: e.target.value})} />
                          </div>
                        </span> : ''}
                    </div> : ''}
                </div>
              </div>
            </div>
              <div className = 'sketcherpad'>
                <SketchPad
                    width={1110}
                    height={800}
                    animate={true}
                    size={size}
                    color={color}
                    fillColor={fill ? fillColor : ''}
                    items={items}
                    tool={tool}
                    onCompleteItem={(i) => socket.emit('addItem', {i, currentdoodleid: this.props.user.currentdoodleid, userpic: this.props.user.user_pic, username: this.props.user.user_name})}
                    />
                </div>
            </div>
            <div className = 'chatbox'>
            <h2></h2>

            <Chat/>
            </div>    
        
        
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
      user: state.user
  };
}

export default connect(mapStateToProps, {getUserData})(Canvas);