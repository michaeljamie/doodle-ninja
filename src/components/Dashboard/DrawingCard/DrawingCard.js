import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DrawingCard.css';
import FileSaver from 'file-saver';
import axios from 'axios';
import { findDOMNode } from 'react-dom';



class DrawingCard extends Component{
    constructor(props){
        super(props);
        
    };

    componentDidMount = () => {
        this.canvas = findDOMNode(this.canvasRef);
        this.ctx = this.canvas.getContext('2d');
    }

   
    saveDrawing = () => {
       
            // convert base64 to raw binary data held in a string
            var byteString = atob(this.props.drawing.split(',')[1]);
            
            // separate out the mime component
            var mimeString = this.props.drawing.split(',')[0].split(':')[1].split(';')[0];
            
            // write the bytes of the string to an ArrayBuffer
            var arrayBuffer = new ArrayBuffer(byteString.length);
            var _ia = new Uint8Array(arrayBuffer);
            for (var i = 0; i < byteString.length; i++) {
                _ia[i] = byteString.charCodeAt(i);
            }
            var dataView = new DataView(arrayBuffer);
            
            var blob = new Blob([dataView], { type: mimeString });
            
            
            
            FileSaver.saveAs(blob, 'doodle.jpg');
              
        
       
    }

    saveDraw = () => {
        this.canvas.toBlob( (blob) => {
          FileSaver.saveAs(blob, 'doodle.jpg');
        })
       }

    addImage = (imgString) => {
        const ctx = this.canvas.getContext('2d');
        const imageObj1 = new Image();
        imageObj1.src = imgString;
        imageObj1.crossOrigin = "Anonymous";
        // const x = Math.random() * this.props.width-300;
        // const y = Math.random() * this.props.height-300;
        
        imageObj1.onload = function() {
          ctx.drawImage(imageObj1,5,5);
        }
      }

    deleteDrawing = () => {
        const {id} = this.props;
        axios.delete(`/api/deleteDrawing/${id}`);

    }

    render (){
        
        const { drawing } = this.props; 
        return (
            <div className = 'drawingcard'>
                <img src={drawing} className = 'drawingimg' alt=""/>
                
                <button className = 'drawingjoin' onClick = {this.saveDrawing}>Save</button>
                <button className = 'drawingjoin' onClick = {this.props.delete}>Delete</button>
                <canvas
                    ref={(canvas) => { this.canvasRef = canvas; }}
                    width={0}
                    height={0}

                />
            </div>
        )
    }

};

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(DrawingCard);
