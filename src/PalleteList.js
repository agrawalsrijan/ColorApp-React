import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

import {withStyles} from "@material-ui/styles";
import styles from "./styles/PalleteListStyles";

import MiniPallete from "./MiniPallete";

class PalleteList extends Component{
  constructor(props){
    super(props);
    this.state = {
      openDeleteDialog:false,
      deletingId:""
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.goToPallete = this.goToPallete.bind(this);
  }
  openDialog(id){
    this.setState({openDeleteDialog:true,deletingId:id});
  }
  closeDialog(){
    this.setState({openDeleteDialog:false,deletingId:""});
  }
  goToPallete(id){
    this.props.history.push(`/pallete/${id}`)
  }
  handleDelete(){
    this.props.deletePallete(this.state.deletingId);
    this.closeDialog();
  }

  render(){
    const {palletes,classes} = this.props;
    const {openDeleteDialog} = this.state;
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
                  goToPallete={this.goToPallete}
                  // handleDelete={deletePallete}
                  openDialog={this.openDialog}
                  key={pallete.id}
                  id={pallete.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">
            Delete This Pallete?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor:blue[100], color:blue[600] }}
                >
                  <CheckIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete"/>
            </ListItem>

            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor:red[100], color:red[600] }}
                >
                  <CloseIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel"/>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PalleteList);
