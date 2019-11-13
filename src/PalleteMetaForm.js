import React,{Component} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import {Picker} from "emoji-mart";

class PalleteMetaForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: true,
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
    const {newPalleteName,open} = this.state;
    const {hideForm,handleSubmit} = this.props;
    return (
       <Dialog
         open={open}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose a Pallete Name</DialogTitle>
          <ValidatorForm
            onSubmit={() => handleSubmit(newPalleteName)}
          >
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful pallete. Make sure it's unique!
              </DialogContentText>
              <Picker/>
              <TextValidator
                label="Pallete Name"
                value={newPalleteName}
                name="newPalleteName"
                fullWidth
                margin="normal"
                onChange={this.handleChange}
                validators={["required","isPalleteNameUnique"]}
                errorMessages={["Enter Pallete Name","Name already used"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save Pallete
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
    );
  }
}
export default PalleteMetaForm;
