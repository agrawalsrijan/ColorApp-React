import React, {Component} from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Pallete.css";
class Pallete extends Component{
// Constructor-
  constructor(props){
    super(props);
    this.state = {level:500,format:"hex"}
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(newLevel){
    this.setState({level:newLevel})
  }

// code to make color format selectors work
  changeFormat(val){
    this.setState({format:val});
  }

// components render-
  render(){
    const {colors,palleteName,emoji} = this.props.pallete;
    const {level,format} = this.state;
    const colorBoxes = colors[level].map(color=>(
      <ColorBox background={color[format]} name={color.name} key={color.id}/>
    ));
    return(
      <div className="Pallete">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className="Pallete-colors">
          {/*bunch of color boxes*/}
          {colorBoxes}
        </div>
        <footer className="Pallete-footer">
          {palleteName}
          <span className="emoji">{emoji}</span>
        </footer>

      </div>

    )
  }
}
export default Pallete;
