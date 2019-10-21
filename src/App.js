import React, {Component} from 'react';
import Pallete from "./Pallete";
import {generatePallete} from "./colorHelper";
import seedColors from "./seedColors";

class App extends Component {
  render(){
    
    return (
      <div>
        <Pallete pallete={generatePallete(seedColors[4])}/>
      </div>
    );
  }

}

export default App;
