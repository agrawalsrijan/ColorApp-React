import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {withStyles} from "@material-ui/styles";
import chroma from "chroma-js";
import "./ColorBox.css";

const styles = {
  ColorBox:{
    height: props => (props.showingFullPallete? "25%" : "50%"),
    width: "20%",
    margin:"0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4.5px",
    "&:hover button": {
      opacity: "1"
    }
  },
  copyText:{
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "black" : "white"
  },
  colorName:{
    color: props =>
      chroma(props.background).luminance() <= 0.1 ? "white" : "black"
  },
  seeMore:{
    color : props =>
      chroma(props.background).luminance() >= 0.5 ? "rgba(0,0,0,0.8)" : "white",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    right: "0px",
    bottom: "0px",
    border:"none",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase"
  },
  copyButton:{
    color: props =>
      chroma(props.background).luminance() >= 0.5 ? "rgba(0,0,0,0.8)" : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline:"none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    border:"none",
    textDecoration: "none",
    opacity: "0"
  }
}
class ColorBox extends Component{

  constructor(props){
    super(props);
    this.state = {copied:false}
    this.changeCopyState = this.changeCopyState.bind(this);
  }
// function to change the state for copied
  changeCopyState(){
    this.setState({copied:true},() => {
      setTimeout(()=>this.setState({copied:false}),1450);
    });
  }
  render(){
    const {name, background,palleteId,id,showingFullPallete,classes} = this.props;
    const {copied} = this.state;
    return(
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{background}} className={classes.ColorBox}>
          <div
            style={{background}}
            className={`copy-overlay ${copied && "show"}`}
          />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>copied!</h1>
            <p className={classes.copyText}>{this.props.background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>

          {showingFullPallete && (
            <Link
              to={`/pallete/${palleteId}/${id}`}
              onClick={e => e.stopPropagation()}
            >
              <span className={classes.seeMore}>More</span>
            </Link>
          )}


        </div>
      </CopyToClipboard>

    )
  }
}
export default withStyles(styles)(ColorBox);
