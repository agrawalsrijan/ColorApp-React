import React, {Component} from 'react';
import {withStyles} from "@material-ui/styles";
import styles from "./styles/PalleteListStyles";
import MiniPallete from "./MiniPallete";






class PalleteList extends Component{
  goToPallete(id){
    this.props.history.push(`/pallete/${id}`)
  }

  render(){
    const {palletes,classes} = this.props;
    return(

      <div className = {classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors!</h1>
          </nav>
          <div className={classes.palletes}>
            {palletes.map(pallete=>(
              <MiniPallete
                {...pallete}
                handleClick={()=>this.goToPallete(pallete.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PalleteList);
