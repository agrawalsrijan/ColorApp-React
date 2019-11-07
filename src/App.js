import React, {Component} from 'react';
import PalleteList from "./PalleteList";
import Pallete from "./Pallete";
import SingleColorPallete from "./SingleColorPallete";
import NewPalleteForm from "./NewPalleteForm";
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
          path = "/pallete/new"
          render = {() => <NewPalleteForm/>}
        />

        <Route
          exact
          path="/"
          render={(routeProps)=> <PalleteList palletes={seedColors} {...routeProps}/>}
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


        <Route
          exact
          path="/pallete/:palleteId/:colorId"
          render={routeProps => (
            <SingleColorPallete
              colorId={routeProps.match.params.colorId}
              pallete={generatePallete(
              this.findPallete(routeProps.match.params.palleteId)
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
