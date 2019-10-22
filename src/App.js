import React, {Component} from 'react';
import Pallete from "./Pallete";
import {Route,Switch} from "react-router-dom";
import {generatePallete} from "./colorHelper";
import seedColors from "./seedColors";

class App extends Component {
  render(){

    return (
      <Switch>

        <Route
          exact
          path="/"
          render={()=> <h1>Pallete list goes here</h1>}
        />

        <Route
          exact
          path="/pallete/:id"
          render={()=> <h1>Individual pallete goes here</h1>}
        />
      </Switch>

      // <div>
      //   <Pallete pallete={generatePallete(seedColors[4])}/>
      // </div>
    );
  }

}

export default App;
