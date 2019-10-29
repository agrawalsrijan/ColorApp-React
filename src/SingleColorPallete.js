import React, {Component} from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PalleteFooter from "./PalleteFooter";
import {withStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";

const styles = {
  Pallete:{
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  colors:{
    height: "90%"
  },
  goBack:{
    height: "50%",
    width: "20%",
    margin:"0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4.5px",
    opacity: "1",
    backgroundColor:"black",
    "& a":{
      color: "white",
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
      opacity: "1"
    }
  }
}


class SingleColorPallete extends Component{

  constructor(props){
    super(props);
    this._shades=this.gatherShades(this.props.pallete,this.props.colorId);
    this.state = {format:"hex"};
    this.changeFormat = this.changeFormat.bind(this);

  }

  gatherShades(pallete,colorToFilterBy){
    let shades = [];
    let allColors = pallete.colors;
    for(let key in allColors){
      shades=shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    }


    //return all the shades
    return shades.slice(1);
  }

// code to make color format selectors work
  changeFormat(val){
    this.setState({format:val});
  }

  render(){
    const {format} = this.state;
    const {palleteName,emoji,id} = this.props.pallete;
    const {classes} = this.props;
    const colorBoxes = this._shades.map(color=>(
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPallete={false}
      />
    ))
    return(
      <div className={classes.Pallete}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false}/>

        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/pallete/${id}`}>Go Back</Link>
          </div>
        </div>
        <PalleteFooter palleteName={palleteName} emoji={emoji}/>
      </div>
    )
  }
}
export default withStyles(styles)(SingleColorPallete);
