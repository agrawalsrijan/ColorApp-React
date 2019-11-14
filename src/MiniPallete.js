import React,{Component} from 'react';
import styles from "./styles/MiniPalleteStyles";
import {withStyles} from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";



class MiniPallete extends Component {
  constructor(props){
    super(props);
    this.deletePallete = this.deletePallete.bind(this);
  }
  deletePallete(e){
    e.stopPropagation();
    this.props.handleDelete(this.props.id);
  }
  render(){
    const {classes,paletteName,emoji,colors,handleClick} = this.props;
    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{backgroundColor:color.color}}
        key={color.name}
      />
    ));
    return(
      <div className = {classes.root} onClick={handleClick}>

        <DeleteIcon
          className={classes.deleteIcon}
          onClick={this.deletePallete}
        />
        <div className={classes.colors}>
          {miniColorBoxes}
        </div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    )
  }
}

export default withStyles(styles)(MiniPallete);
