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
    //console.log('constructor App');
    this.canvas = null;
    // this.image = null;
    this.setCanvasRef = (element) => {
      this.canvas = element;
    };

    this.state = {
      image: null,
      fontSize: 24,
      points: [],
      counter: 0,
    };

    this.loadFile = this.loadFile.bind(this);
    this.addNumberForImage = this.addNumberForImage.bind(this);
    this.undoImage = this.undoImage.bind(this);
    this.changeFontSize = this.changeFontSize.bind(this);
  }

  // TODO: 加载的图片有不能显示的情况发生。DONE
  loadFile(e) {
    //console.log('start loading image.');
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      let reader = new FileReader();
      reader.onload = (e) => {
        //console.log('loaded image');
        let image = new Image();
        image.src = e.target.result;
        image.onload = (e) => {
          //console.log('loadeddddd image size:', e.target.width, e.target.height);
          this.canvas.width = image.width;
          this.canvas.height = image.height;
          //console.log('loaded image size:', image.width, image.height);
          this.drawPoints(this.canvas.getContext('2d'), image);
          this.setState({
            image: image,
            points: [],
            counter: 0
          });
        }
        // 调整canvas的大小和图片一样
      };
      reader.readAsDataURL(e.target.files[0]); //读取文件
      //console.log('loading image');
    }
  }

  addNumberForImage(e) {
    e.preventDefault();
    if (this.state.image) {
      let x = Math.floor(e.pageX - e.target.offsetLeft);
      let y = Math.floor(e.pageY - e.target.offsetTop);
      let counter = this.state.counter;
      let fontSize = this.state.fontSize;
      this.setState({
        points: [...this.state.points, [x, y, ALL_ZIFU[counter % ALL_ZIFU.length], fontSize]],
        counter: counter + 1
      });
    }
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

  changeFontSize(e) {
    console.log(e)
    e.preventDefault();
    if (e.target.value) {
      this.setState({
        fontSize: e.target.value
      });
    }
  }

  drawPoints(ctx) {
    if (ctx == null) {
      return;
    }

    ctx.fillStyle = 'red';
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.state.image) {
      // console.log('image size:', image.width, image.height);
      // console.log('canvas size:', this.canvas.width, this.canvas.height);
      // console.log('draw image.');
      ctx.drawImage(this.state.image, 0, 0);
    }

    this.state.points.forEach(([x, y, ch, fontSize]) => {
      //console.log('x: ', x, ',y: ', y);
      ctx.font = `${fontSize}px serif`;

      // textAlign = start, end, left, right or center
      ctx.textAlign = 'left';
      // textBaseline = top, hanging, middle, alphabetic, ideographic, bottom
      ctx.textBaseline = 'middle';
      ctx.fillStyle = "red";
      ctx.fillText(`${ch}`, x, y);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.state);
    //console.log('start componentDidUpdate');
    this.drawPoints(this.canvas.getContext('2d'));
    //console.log('end componentDidUpdate');
  }

  componentDidMount() {
    //console.log('start componentDidMount');
    //this.drawPoints(this.canvas.getContext('2d'));
    //console.log('end componentDidMount')
  }

  render() {
    //console.log('call render.');
    return (
    <div className="App">
      <header className = "App-header">
        <ToolBar loadFile={this.loadFile}
                 saveImage={this.saveImage}
                 undoImage={this.undoImage}
                 changeFontSize={this.changeFontSize}
                 fontSize={this.state.fontSize} />
      </header>
      <div className="App-body">
        <canvas ref={this.setCanvasRef} onClick={this.addNumberForImage} />
      </div>
      <div className="status-bar">
        <span>Edit image for adding number by Chen Guangqi (Copyright © 2019).</span>
      </div>
    </div>
    );
  }
}

export default App;
