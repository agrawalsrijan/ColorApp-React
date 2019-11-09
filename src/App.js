import React, {Component} from 'react';
import PalleteList from "./PalleteList";
import Pallete from "./Pallete";
import SingleColorPallete from "./SingleColorPallete";
import NewPalleteForm from "./NewPalleteForm";
import {Route,Switch} from "react-router-dom";
import {generatePallete} from "./colorHelper";
import seedColors from "./seedColors";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {palletes:seedColors};
    this.savePallete = this.savePallete.bind(this);
    this.findPallete = this.findPallete.bind(this);
  }
// function to find pallete by id
  findPallete(id){
    return this.state.palletes.find(function(pallete){
      return pallete.id === id;
    });
  }
  savePallete(newPallete){
    this.setState({palletes:[...this.state.palletes,newPallete]});
  }
  render(){

    return (
      <Switch>
        <Route
          exact
          path = "/pallete/new"
          render = {(routeProps) => (
            <NewPalleteForm savePallete={this.savePallete} {...routeProps}/>
          )}
        />

        <Route
          exact
          path="/"
          render={(routeProps)=> <PalleteList palletes={this.state.palletes} {...routeProps}/>}
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
