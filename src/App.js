import React from 'react';
//import logo from './logo.svg';
import './App.css';


const ALL_ZIFU = Array.from(
    "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊷㊹㊺㊼㊽㊾㊿"
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = null;
    this.image = null;
    this.setCanvasRef = (element) => {
      console.log('set context');
      console.dir(element);
      console.dir(element.getContext('2d'));
      this.canvas = element;
    };

    this.setImageRef = (element) => {
      this.image = element;
    };

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
      };
      reader.readAsDataURL(e.target.files[0]);//读取文件
    }
  }



  addNumberForImage(e) {
    e.preventDefault();
    // console.log(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
    if (this.state.image) {
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;
      let index = this.state.counter;
      this.setState({
        points: [...this.state.points, [x, y, ALL_ZIFU[index]]],
        counter: index + 1
      })
    }
  }

  saveImage(e) {
    this.image.src = this.canvas.toDataURL("image/png");
  }

  undoImage(e) {
    this.setState({
      points: this.state.points.slice(0, this.state.points.length - 1),
      counter: this.state.counter - 1
    })
  }

  drawPoints(ctx) {
    // cxt.fillStyle="#FF0000";
    // cxt.fillRect(0,0,150,75);
    if (ctx == null) {
      return;
    }

    if (this.state.image) {
      ctx.drawImage(this.state.image, 0 ,0);
      this.state.points.forEach(([x, y, char]) => {
        console.log('x: ', x, ',y: ', y);
        ctx.moveTo(x, y);
        // ctx.arc(x, y, 5, 0, Math.PI *
        ctx.fillText(`${char}`, x, y);
      });
      ctx.fill();
    } else {
      ctx.fillStyle="#FF0000";
      ctx.fillRect(0,0, 100, 100);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.state);
    this.drawPoints(this.canvas.getContext('2d'));
  }

  componentDidMount() {
    // console.log(this.state);
    this.drawPoints(this.canvas.getContext('2d'));
  }

  render() {

    return (
        <div className="App">

          <header className="App-header">
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            <p>
              Edit image for adding number.
            </p>
            {/*<a*/}
            {/*    className="App-link"*/}
            {/*    href="https://reactjs.org"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*>*/}
            {/*  Learn React*/}
            {/*</a>*/}
            <input type="file" onChange={this.loadFile} accept="image/png,image/jpeg" />
            <button onClick={this.saveImage}>保存图片</button>
            <button onClick={this.undoImage}>撤销</button>
          </header>
          <div className="App-body">
            {/*{this.state.image ? : null}*/}
            <canvas width="1042" height="1024" ref={this.setCanvasRef} onClick={this.addNumberForImage} />
            <img alt="" ref={this.setImageRef} />
          </div>
        </div>
    );
  }
}

export default App;
