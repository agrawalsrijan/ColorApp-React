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
  },
  boxContent:{
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding:"10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px"
  },
  copyOverlay:{
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)"
  },
  showOverlay:{
    opacity: "1",
    transform: "scale(50)",
    position: "absolute",
    zIndex: "10"
  },
  copyMessage:{
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background:"rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
    },
    "& p": {
      fontWeight: "200",
      fontSize: "2rem"
    }
  },
  showMessage:{
    opacity: "1",
    transform: "scale(1)",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
    zIndex: "11",
    textTransform: "uppercase"
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
            className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
          />
          <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
            <h1>copied!</h1>
            <p className={classes.copyText}>{this.props.background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
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
