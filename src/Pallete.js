import React, {Component} from 'react';
import ColorBox from "./ColorBox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
// local css should come after the rc-slider css
import "./Pallete.css";
class Pallete extends Component{
  constructor(props){
    super(props);
    this.state = {level:500}
    this.changeLevel = this.changeLevel.bind(this);
  }
  changeLevel(newLevel){
    this.setState({level:newLevel})
  }
  render(){
    const {colors} = this.props.pallete;
    const {level} = this.state;
    const colorBoxes = colors[level].map(color=>(
      <ColorBox background={color.hex} name={color.name}/>
    ));
    return(
      <div className="Pallete">
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>

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
