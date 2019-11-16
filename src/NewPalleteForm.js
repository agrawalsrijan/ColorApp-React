import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PalleteFormNav from "./PalleteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import {arrayMove} from "react-sortable-hoc";
import styles from "./styles/NewPalleteFormStyles";
import seedColors from "./seedColors";

class NewPalleteForm extends Component{
  static defaultProps = {
    maxColors:20
  };
  constructor(props){
    super(props);
    this.state = {
      open:true,
      colors: seedColors[0].colors,
      newPalleteName:""
    };
    this.addNewColor = this.addNewColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor(newColor){

    this.setState({colors:[...this.state.colors,newColor],newColorName:""})
  }

  clearColors(){
    this.setState({ colors:[] });
  }
  addRandomColor(){
    const allColors = this.props.palletes.map(p=>p.colors).flat();
    var rand = Math.floor(Math.random()*allColors.length);
    const randomColor = allColors[rand];
    this.setState({colors:[...this.state.colors,randomColor]});
  }
  handleSubmit(newPallete){
    newPallete.paletteName = newPallete.palleteName;
    newPallete.id = newPallete.paletteName.toLowerCase().replace(/ /g,"-");
    newPallete.colors = this.state.colors;

    this.props.savePallete(newPallete);
    this.props.history.push("/");
  }
  removeColor(colorName){
    this.setState({
      colors:this.state.colors.filter(color => color.name !== colorName)
    });
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  render() {
    const { classes, maxColors, palletes } = this.props;
    const { open, colors } = this.state;
    const palleteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PalleteFormNav
          open={open}
          palletes={palletes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design your pallete
            </Typography>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
              >
                Clear Pallete
              </Button>

              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={palleteIsFull}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              palleteIsFull={palleteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPalleteForm);
