import React,{Component} from "react";
import classNames from 'classnames';
import {Link} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";


class PalleteFormNav extends Component{
  constructor(props){
    super(props);
    this.state = {newPalleteName:""};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    ValidatorForm.addValidationRule("isPalleteNameUnique", value =>
      this.props.palletes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render(){
    const {classes,open} = this.props;
    const {newPalleteName} = this.state;
    return(
      <div>
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
              Persistent drawer
            </Typography>
            <ValidatorForm
              onSubmit={() => this.props.handleSubmit(newPalleteName)}
            >
              <TextValidator
                label="Pallete Name"
                value={this.state.newPalleteName}
                name="newPalleteName"
                onChange={this.handleChange}
                validators={["required","isPalleteNameUnique"]}
                errorMessages={["Enter Pallete Name","Name already used"]}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save Pallete
              </Button>
              <Link to="/">
                <Button variant="contained" color="secondary">Go Back</Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
export default PalleteFormNav;
