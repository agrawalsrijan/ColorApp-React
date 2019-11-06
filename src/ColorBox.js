import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard";
// colorbox styles moved to JSS styles in a seperate file
import styles from "./styles/ColorBoxStyles";
import {withStyles} from "@material-ui/styles";



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
