import React from 'react';

import ToolBar from './components/ToolBar';
//import logo from './logo.svg';
import './App.css';


const ALL_ZIFU = Array.from(
    "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿"
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = null;
    // this.image = null;
    this.setCanvasRef = (element) => {
      this.canvas = element;
    };

    // this.setImageRef = (element) => {
    //   this.image = element;
    // };

    this.state = {
      image: null,
      points: [],
      counter: 0,
    };

    this.loadFile = this.loadFile.bind(this);
    this.addNumberForImage = this.addNumberForImage.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.undoImage = this.undoImage.bind(this);
  }

  loadFile(e) {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let image = new Image();
        image.src = e.target.result;
        this.setState({
          image: image
        });
        console.log('init draw image.');
        this.drawPoints(this.canvas.getContext('2d'));
      };
      reader.readAsDataURL(e.target.files[0]);//读取文件
    }
  }

  addNumberForImage(e) {
    e.preventDefault();
      let x = Math.floor(e.pageX - e.target.offsetLeft);
      let y = Math.floor(e.pageY - e.target.offsetTop);
      let counter = this.state.counter;
      this.setState({
        points: [...this.state.points, [x, y, ALL_ZIFU[counter % ALL_ZIFU.length]]],
        counter: counter + 1
      });
  }

  saveImage(e) {
    //this.image.src = this.canvas.toDataURL("image/png");
  }

  undoImage(e) {
    this.setState({
      points: this.state.points.slice(0, this.state.points.length - 1)
    });

    let counter = this.state.counter;
    if (counter > 0) {
      this.setState({
        counter: counter - 1
      });
    }
  }

  drawPoints(ctx) {
    if (ctx == null) {
      return;
    }

    ctx.fillStyle = 'red';
    //ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.state.image) {
      ctx.drawImage(this.state.image, 0 ,0);
    }
    
    this.state.points.forEach(([x, y, char]) => {
      //console.log('x: ', x, ',y: ', y);
      ctx.font = '50px serif';
      
      // textAlign = start, end, left, right or center
      ctx.textAlign = 'left';
      // textBaseline = top, hanging, middle, alphabetic, ideographic, bottom
      ctx.textBaseline = 'middle';
      ctx.fillStyle = "red";
      ctx.fillText(`${char}`, x, y);
    });
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   console.log('shouldComponentUpdate');
  //   return true;
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.state);
    this.drawPoints(this.canvas.getContext('2d'));
  }

  componentDidMount() {
    // console.log(this.state);
    //this.drawPoints(this.canvas.getContext('2d'));
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <ToolBar loadFile={this.loadFile} saveImage={this.saveImage} undoImage={this.undoImage}/>

          </header>
          <div className="App-body">
            <canvas width="1024" height="1024" ref={this.setCanvasRef} onClick={this.addNumberForImage} />
            {/* <img alt="" ref={this.setImageRef} /> */}
          </div>
          <div className="status-bar">
            <span>Edit image for adding number.</span>
          </div>
        </div>
    );
  }
}

export default App;
