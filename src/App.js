import React, {Component} from 'react';
import Pallete from "./Pallete";
import {Route,Switch} from "react-router-dom";
import {generatePallete} from "./colorHelper";
import seedColors from "./seedColors";

class App extends Component {
// function to find pallete by id
  findPallete(id){
    return seedColors.find(function(pallete){
      return pallete.id === id;
    });
  }
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
          render={routeProps => (
            <Pallete pallete={generatePallete(
              this.findPallete(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>

      // <div>
      //   <Pallete pallete={generatePallete(seedColors[4])}/>
      // </div>
    );
  }

}

export default App;
