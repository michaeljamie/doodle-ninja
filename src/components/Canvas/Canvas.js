import React, { Component } from 'react';
import SketchPad from './Tools/SketchPad';
import {TOOL_PENCIL} from './Tools/Pencil';
import {TOOL_LINE} from './Tools/Line';
import {TOOL_RECTANGLE} from './Tools/Rectangle';
import {TOOL_ELLIPSE} from './Tools/Ellipse';
import Chat from './../Chat/Chat';
import './Canvas.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3005')




export default class Canvas extends Component {



  constructor(props){
    super(props);
    this.state = {
        tool:TOOL_PENCIL,
        size: 2,
        color: '#000000',
        fill: false,
        fillColor: '#444444',
        items: []
    }




  }

  componentDidMount = () => {
    socket.on('addItem', item => this.setState({items: this.state.items.concat([item])}));
    

  }
  
 
  
  

  render() {
    const { tool, size, color, fill, fillColor, items } = this.state;
  
    return (
      
      
      
        
        <div  className = 'canvasbody'>
        
        
            <div>
            <SketchPad
                width={800}
                height={800}
                animate={true}
                size={size}
                color={color}
                fillColor={fill ? fillColor : ''}
                items={items}
                tool={tool}
                onCompleteItem={(i) => socket.emit('addItem', i)}/>
            </div>
        
        
        <div style={{float:'left'}}>
          <div className="tools" style={{marginBottom:20}}>
            <button
              style={tool === TOOL_PENCIL ? {fontWeight:'bold'} : undefined}
              className={tool === TOOL_PENCIL  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_PENCIL})}
            >Pencil</button>
            <button
              style={tool === TOOL_LINE ? {fontWeight:'bold'} : undefined}
              className={tool === TOOL_LINE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_LINE})}
            >Line</button>
            <button
              style={tool === TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={tool === TOOL_ELLIPSE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ELLIPSE})}
            >Ellipse</button>
            <button
              style={tool === TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={tool === TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_RECTANGLE})}
            >Rectangle</button>
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">size: </label>
            <input min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: Number(e.target.value)})} />
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">color: </label>
            <input type="color" value={color} onChange={(e) => this.setState({color: e.target.value})} />
          </div>
          {(this.state.tool === TOOL_ELLIPSE || this.state.tool === TOOL_RECTANGLE) ?
            <div>
              <label htmlFor="">fill in:</label>
              <input type="checkbox" value={fill} style={{margin:'0 8'}}
                     onChange={(e) => this.setState({fill: e.target.checked})} />
              {fill ? <span>
                  <label htmlFor="">with color:</label>
                  <input type="color" value={fillColor} onChange={(e) => this.setState({fillColor: e.target.value})} />
                </span> : ''}
            </div> : ''}
            <div className = 'chatbox'>
            <Chat/>
            </div>    
        </div>
        
      </div>
    );
  }
}


