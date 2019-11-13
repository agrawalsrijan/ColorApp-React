import React,{Component} from "react";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PalleteMetaForm from "./PalleteMetaForm";
import {Link} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";

const drawerWidth = 400;
const styles = theme => ({
  root:{
    display:"flex"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection:"row",
    justifyContent:"space-between",
    height:"64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  navBtns: {

  }
});

class PalleteFormNav extends Component{
  constructor(props){
    super(props);
    this.state = {newPalleteName:""};

  }



  render(){
    const {classes,open,palletes,handleSubmit} = this.props;

    return(
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create A Pallete
            </Typography>

          </Toolbar>
          <div className={classes.navBtns}>

            <PalleteMetaForm palletes={palletes} handleSubmit={handleSubmit}/>
            <Link to="/">
              <Button variant="contained" color="secondary">Go Back</Button>
            </Link>
          </div>
        </AppBar>
      </div>
    )
  }
}
export default withStyles(styles, { withTheme: true })(PalleteFormNav);
