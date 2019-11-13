import React,{Component} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";

class PalleteMetaForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
      newPalleteName:""
    };
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
  handleClickOpen = () => {
   this.setState({ open: true });
  };

  handleClose = () => {
   this.setState({ open: false });
  };

  render() {
    const {newPalleteName} = this.state;
    return (
      <div>
       <Button onClick={this.handleClickOpen}>Open form dialog</Button>
       <Dialog
         open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <ValidatorForm
              onSubmit={() => this.props.handleSubmit(newPalleteName)}
            >
              <TextValidator
                label="Pallete Name"
                value={newPalleteName}
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

            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PalleteMetaForm;
