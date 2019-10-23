import React from 'react';
import {withStyles} from "@material-ui/styles";

const styles = {
  main:{
    backgroundColor:"purple",
    border:"3px solid teal"

  },
  secondary:{
    backgroundColor:"pink",
    "& h1":{
      color:"white"
    }
  }
}

function MiniPallete(props){
  const {classes} = props;
  return(
    <div className = {classes.main}>
      <h1>Mioni Pallete!</h1>
      <section className={classes.secondary}>
        <h1>Mioni Pallete!</h1>
      </section>
    </div>
  )

}

export default withStyles(styles)(MiniPallete);
