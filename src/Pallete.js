import React, {Component} from 'react';
import ColorBox from "./ColorBox";

import "./Pallete.css";
class Pallete extends Component{
  render(){
    const colorBoxes = this.props.pallete.colors[800].map(color=>(
      <ColorBox background={color.hex} name={color.name}/>
    ));
    return(
      <div className="Pallete">
        {/* navbar goes here */}
        <div className="Pallete-colors">
          {/*bunch of color boxes*/}
          {colorBoxes}
        </div>
        {/*footer eventually*/}

      </div>

    )
  }
}
export default Pallete;
