import React, {Component} from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
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
        <Navbar level={level} changeLevel={this.changeLevel}/>

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
