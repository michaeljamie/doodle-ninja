import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Pencil, Line, Ellipse, Rectangle, Eraser} from './Tools';
import {TOOL_PENCIL} from './Pencil';
import {TOOL_LINE} from './Line';
import {TOOL_RECTANGLE} from './Rectangle';
import {TOOL_ELLIPSE} from './Ellipse';
import {TOOL_ERASER} from './Eraser';
import FileSaver from 'file-saver';
import io from 'socket.io-client';
import './SketchPad.css';
import save from './../../../images/save.png';
import clear from './../../../images/clear.png';
import adduser from './../../../images/adduser.png';
import uploadwhite from './../../../images/uploadwhite.png';
import downloadwhite from './../../../images/downloadwhite.png';
import closewhite from './../../../images/closewhite.png';
import addimage from './../../../images/addimage.png';
import axios from 'axios';
import { connect } from 'react-redux';
import { EmailShareButton } from 'react-share';


const socket = io()

export const toolsMap = {
    [TOOL_PENCIL]: Pencil,
    [TOOL_LINE]: Line,
    [TOOL_RECTANGLE]: Rectangle,
    [TOOL_ELLIPSE]: Ellipse,
    [TOOL_ERASER]: Eraser
  };

class SketchPad extends Component {
  constructor(props){
    super(props);
    this.state = {
        imageurl: '',
        backgroundColor: '#ffffff',
        display: false,
        selectedDrawing: '',
        drawings: [],
        displayDownload: false,
        displayImage: false
    }




  }
 

  tool = null;
  interval = null;

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    items: PropTypes.array.isRequired,
    animate: PropTypes.bool,
    canvasClassName: PropTypes.string,
    color: PropTypes.string,
    fillColor: PropTypes.string,
    size: PropTypes.number,
    tool: PropTypes.string,
    toolsMap: PropTypes.object,
    onItemStart: PropTypes.func, 
    onEveryItemChange: PropTypes.func, 
    onDebouncedItemChange: PropTypes.func, 
    onCompleteItem: PropTypes.func, 
    debounceTime: PropTypes.number,
  };

  static defaultProps = {
    width: 500,
    height: 500,
    color: '#000',
    size: 5,
    fillColor: '',
    canvasClassName: 'canvas',
    debounceTime: 1000,
    animate: true,
    tool: TOOL_PENCIL,
    toolsMap
  };

 

  componentDidMount = () => {
    socket.on()
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    this.setBackground();
    axios.get('/api/drawings').then(res => {
            
      this.setState({drawings: res.data})

});
    socket.on(`addImage-${this.props.doodleName}`, data => {
      console.log('front-end data =', data)
      this.addImage(data.imageUrl);
    })
    socket.on(`clearcanvas-${this.props.doodleName}`, data => {
      console.log('canvasdata=', data)
      this.clearCanvas();
    })
    socket.on(`downloadCanvas-${this.props.doodleName}`, data => {
      console.log('data', data)
      this.addCanvas(data)
    })
    // this.addText();
    this.initTool(this.props.tool);
  }

  componentWillReceiveProps = ({tool, items}) => {
    items
      .filter(item => this.props.items.indexOf(item) === -1)
      .forEach(item => {
        this.initTool(item.tool);
        this.tool.draw(item, this.props.animate);
        
      });
    this.initTool(tool);
  }

  addCanvas = (dataurl) => {

    const ctx = this.canvas.getContext('2d');
    const imageObj1 = new Image();
    imageObj1.src = dataurl;
    imageObj1.crossOrigin = "Anonymous";
    // const x = Math.random() * this.props.width-300;
    // const y = Math.random() * this.props.height-300;
    
    imageObj1.onload = function() {
      ctx.drawImage(imageObj1,0,0);
    }
  }



  addImage = (imgString) => {
    const ctx = this.canvas.getContext('2d');
    const imageObj1 = new Image();
    imageObj1.src = imgString;
    

    var w = this.canvas.width-20;
    var h = this.canvas.height-20;
    imageObj1.crossOrigin = "Anonymous";
    imageObj1.onload = function() {
      ctx.drawImage(imageObj1,20,20, w, h);
    }
    this.updateImgDisplay();
  }

  setBackground = () => {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
  }

  clearCanvas = () => {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.setBackground();
  }

  saveCanvas = () => {
   this.canvas.toBlob( (blob) => {
     console.log(blob);
     FileSaver.saveAs(blob, 'doodle.jpg');
   })
  }

  uploadCanvas = () => {
    var dataURL = this.canvas.toDataURL()
    axios.post('/api/upload', {
      dataURL,
      username: this.props.user.user_name
    })
   }

  sendImage = () => {
    var imgObj = {
      imageUrl: this.state.imageurl,
      currentdoodleid: this.props.doodleName
    }
    console.log(imgObj)
    socket.emit('sendImage', imgObj)
  }

  clearSend = () => {
    var data = {
      currentdoodleid: this.props.doodleName
    }
    socket.emit('clearImage', data)
  }

  addText = () => {
    const ctx = this.canvas.getContext('2d');
    ctx.lineWidth=1;
    ctx.fillStyle="#CC00FF";
    ctx.lineStyle="#ffff00";
    ctx.font="18px sans-serif";
    ctx.fillText("Fill Text, 18px, sans-serif", 20, 20);
  }

//   changeBackground = () =>
// {
//     const ctx = this.canvas.getContext('2d');
//     //cache height and width        
//     var w = this.canvas.width;
//     var h = this.canvas.height;
//     var backgroundColor = this.state.backgroundColor;
    

//     var data = ctx.getImageData(0, 0, w, h);     

//     //store the current globalCompositeOperation
//     var compositeOperation = ctx.globalCompositeOperation;

//     //set to draw behind current content
//     ctx.globalCompositeOperation = "destination-over";

//     //set background color
//     ctx.fillStyle = backgroundColor;

//     //draw background / rect on entire canvas
//     ctx.fillRect(0,0,w,h);
    

//     //get the image data from the canvas
//     var imageData = this.canvas.toDataURL("image/png");

//     //clear the canvas
//     ctx.clearRect (0,0,w,h);

//     //restore it with original / cached ImageData
//     ctx.putImageData(data, 0,0);        

//     //reset the globalCompositeOperation to what it was
//     ctx.globalCompositeOperation = compositeOperation;
    

//     //return the Base64 encoded data url string
//     return imageData;
// }


  initTool = (tool) => {
    this.tool = this.props.toolsMap[tool](this.ctx);
  }

  onMouseDown = (e) => {
    const data = this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor);
    data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
    }
  }


  onDebouncedMove = () => {
    if (typeof this.tool.onDebouncedMouseMove === 'function' && this.props.onDebouncedItemChange) {
      this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
    }
  }

  onMouseMove = (e) => {
    const data = this.tool.onMouseMove(...this.getCursorPosition(e));
    data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
  }

  onMouseUp = (e) => {
    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }


  getCursorPosition = (e) => {
    const {top, left} = this.canvas.getBoundingClientRect();
    return [
      e.clientX - left,
      e.clientY - top
    ];
  }

  downloadDrawing = (datastring) => {
    var data = {
      datastring: datastring,
      currentdoodleid: this.props.doodleName
    }
    socket.emit('downloadBlob', data)
    this.updateDisplay();
}

  showDisplay = () => {
    this.setState({ displayDownload: true })
  }

  updateDisplay = () => {
    this.setState({ displayDownload: false })
  }

  showImgDisplay = () => {
    this.setState({ displayImage: true })
  }

  updateImgDisplay = () => {
    this.setState({ displayImage: false })
  }

  keyPress = (e) => {
    if(e.keyCode === 13){
      this.sendImage(this.state.imageurl);
    }
}

  handleChange = (property, value) => {
    this.setState({
  [property]: value
  })
}

  render() {
    const {width, height, canvasClassName} = this.props;

    const downloadsArr = this.state.drawings.map((e, i) => {
      return (
        <div key = {e.id} className = 'downloadscard'>
          <div className = 'downloads'>
            <img src={e.dataurl} className = 'drawingimg' alt=""/>
            <button className = 'downloadjoin' onClick = {() => this.downloadDrawing(e.dataurl)}>Download to Canvas</button>
          </div>
          
        </div>
          // <DrawingCard
          // key ={e.id}
          // id = {e.id}
          // drawing = {e.dataurl}
          // delete = {() => {this.deleteDrawing(e.id)}}
          // />
      )
  })
    
    
    return (
      <div>
        <div className = 'canvasoptions'>
          <div>
            <EmailShareButton
              url='http://www.doodle.ninja/#/canvas'
              subject='Join My Doodle!'
              body="body"
              className = 'emailshare'>
              <img className = 'pencilbutton' src={adduser} alt="share"/>
            </EmailShareButton>
          </div>
          <div>
            <img className = 'pencilbutton' onClick = {this.uploadCanvas} src={uploadwhite} alt="upload"/>
            <img className = 'pencilbutton' onClick = {this.saveCanvas} src={save} alt="save"/>
            <img className = 'pencilbutton' onClick = {this.showDisplay} src={downloadwhite} alt="upload"/>
            <img className = 'pencilbutton' onClick = {this.showImgDisplay} src={addimage} alt="addimage"/>
            <img className = 'pencilbutton' onClick = {this.clearSend} src={clear} alt="clear"/>
          </div>
          
       
        
          
          {/* <button className = 'canvasbutton' onClick = {this.clearCanvas}>Clear</button>
          <button className = 'canvasbutton' onClick = {this.saveCanvas}>Save</button> */}
          
          
          {/* <label htmlFor="">Background color: </label>
          <input type="color" value={this.state.backgroundColor} onChange={(e) => this.setState({backgroundColor: e.target.value})} />
          <button onClick = {this.changeBackground}>Update background</button> */}
         
        </div>
        { this.state.displayDownload ?
          <div className = 'download'>
            <div className = 'downloadtop'>
              <img src={closewhite} onClick = {this.updateDisplay} alt="" className = 'closeicon'/>
            </div>
            <div className = 'downloadbox'>
              {downloadsArr}
            </div>
          </div> : ''}
          { this.state.displayImage ?
          <div className = 'add_image'>
            <div className = 'add_imagetop'>
              <img src={closewhite} onClick = {this.updateImgDisplay} alt="" className = 'closeicon'/>
            </div>
            <div className = 'add_imagebox'>
              <input type="text" className = 'createinput' onKeyDown={this.keyPress} onChange = {(e) => {this.handleChange('imageurl', e.target.value)}} placeholder = 'Image URL' value = {this.state.imageurl}/>
              <button className = 'ImageButton' onClick = {()=> {this.sendImage(this.state.imageurl)}}><span>Add to Canvas</span></button>
            </div>
          </div> : ''}
          <div className = 'canvasspace'>
            <canvas
              ref={(canvas) => { this.canvasRef = canvas; }}
              className={canvasClassName}
              onMouseDown={this.onMouseDown}
              onMouseMove={this.onMouseMove}
              onMouseOut={this.onMouseUp}
              onMouseUp={this.onMouseUp}
              width={width}
              height={height}
            />
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

export default connect(mapStateToProps)(SketchPad);
