import React from "react";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/PalleteFooterStyles";

function PalleteFooter(props){
  const {palleteName,emoji,classes} = props;
  return(

    <footer className={classes.PalleteFooter}>
      {palleteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  )
}

export default withStyles(styles)(PalleteFooter);
