import React, {Component} from 'react';
import {Route,Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import Pallete from "./Pallete";
import PalleteList from "./PalleteList";
import SingleColorPallete from "./SingleColorPallete";
import Page from "./Page";
import NewPalleteForm from "./NewPalleteForm";

import seedColors from "./seedColors";
import {generatePallete} from "./colorHelper";



class App extends Component {
  constructor(props){
    super(props);
    const savedPalletes = JSON.parse(window.localStorage.getItem("palletes"));
    this.state = {palletes:savedPalletes || seedColors};
    this.savePallete = this.savePallete.bind(this);
    this.findPallete = this.findPallete.bind(this);
    this.deletePallete = this.deletePallete.bind(this);
  }
// function to find pallete by id
  findPallete(id){
    return this.state.palletes.find(function(pallete){
      return pallete.id === id;
    });
  }
  deletePallete(id){
    this.setState(
      st => ({palletes:st.palletes.filter(pallete => pallete.id !== id)}),
      this.syncLocalStorage
    );
  }
  savePallete(newPallete){
    this.setState({palletes:[...this.state.palletes,newPallete]},
      this.syncLocalStorage);
  }
  syncLocalStorage(){
    //save palletes to local localStorage
    window.localStorage.setItem(
      "palletes",JSON.stringify(this.state.palletes)
    );
  }
  render(){

    return (
      <Route
        render={({location}) =>(
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={300}>
              <Switch location={location}>
                <Route
                  exact
                  path = "/pallete/new"
                  render = {(routeProps) => (
                    <Page>
                      <NewPalleteForm
                        savePallete={this.savePallete}
                        palletes={this.state.palletes}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />

                <Route
                  exact
                  path="/"
                  render={(routeProps)=> (
                    <Page>
                      <PalleteList
                        palletes={this.state.palletes}
                        deletePallete={this.deletePallete} {...routeProps}
                      />
                    </Page>
                  )}
                />

                <Route
                  exact
                  path="/pallete/:id"
                  render={routeProps => (
                    <Page>
                      <Pallete pallete={generatePallete(
                        this.findPallete(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />


                <Route
                  exact
                  path="/pallete/:palleteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPallete
                        colorId={routeProps.match.params.colorId}
                        pallete={generatePallete(
                        this.findPallete(routeProps.match.params.palleteId)
                        )}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />

      // <div>
      //   <Pallete pallete={generatePallete(seedColors[4])}/>
      // </div>
    );
  }

}

export default App;
