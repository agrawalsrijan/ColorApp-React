import React, {Component} from 'react';
import Pallete from "./Pallete";
import {generatePallete} from "./colorHelper";
import seedColors from "./seedColors";

class App extends Component {
  render(){
    console.log(generatePallete(seedColors[4]))
    return (
      <div>
        <Pallete {...seedColors[4]}/>
      </div>
    );
  }

}

export default App;
