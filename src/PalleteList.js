import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {withStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import styles from "./styles/PalleteListStyles";
import MiniPallete from "./MiniPallete";

class PalleteList extends Component{
  goToPallete(id){
    this.props.history.push(`/pallete/${id}`)
  }

  render(){
    const {palletes,classes,deletePallete} = this.props;
    return(
      <div className = {classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors!</h1>
            <Link to="/pallete/new">Create Pallete</Link>
          </nav>

            <TransitionGroup className={classes.palletes}>
              {palletes.map(pallete=>(
                <CSSTransition
                  key={pallete.id}
                  classNames="fade"
                  timeout={500}
                >
                  <MiniPallete
                    {...pallete}
                    handleClick={()=>this.goToPallete(pallete.id)}
                    handleDelete={deletePallete}
                    key={pallete.id}
                    id={pallete.id}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>

        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PalleteList);
