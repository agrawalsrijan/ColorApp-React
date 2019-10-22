import React, {Component} from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
// local css should come after the rc-slider css
import "./Navbar.css";

class Navbar extends Component{
// Constructor-
  constructor(props){
    super(props);
    this.state = {format:"hex"};
    this.handleChange = this.handleChange.bind(this);
  }
// function to handle change in color formats-
  handleChange(e){
    this.setState({format:e.target.value});
    this.props.handleChange(e.target.value);
  }
// render-
  render(){
    const {level,changeLevel} = this.props;
    const {format}  = this.state;
    return(
      <header className="Navbar">
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>Level:{level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,0.5)</MenuItem>
          </Select>
        </div>

      </header>

    )
  }
}
export default Navbar;
