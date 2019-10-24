import React, {Component} from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PalleteFooter from "./PalleteFooter";
import {Link} from "react-router-dom";




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
    const colorBoxes = this._shades.map(color=>(
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showLink={false}
      />
    ))
    return(
      <div className="SingleColorPallete Pallete">
        <Navbar handleChange={this.changeFormat} showingAllColors={false}/>

        <div className="Pallete-colors">
          {colorBoxes}
          <div className="go-back ColorBox">
            <Link to={`/pallete/${id}`} className="back-button">Go Back</Link>
          </div>
        </div>
        <PalleteFooter palleteName={palleteName} emoji={emoji}/>
      </div>
    )
  }
}
export default SingleColorPallete;
