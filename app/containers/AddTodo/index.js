import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import * as actions from "containers/App/duck";
import AddTodoDialog from "./AddTodoDialog";

const styles = theme => ({
  root: {}
});

class AddTodo extends React.PureComponent {
  state = {
    dialogOpen: false
  };

  addTodo = payload => {
    this.props.addTodo(payload);
    this.setState({ dialogOpen: false });
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { dialogOpen } = this.state;
    return (
      <React.Fragment>
        <Fab color="primary" className={classes.root}>
          <AddIcon onClick={this.openDialog} />
        </Fab>
        <Dialog open={dialogOpen} onClose={this.closeDialog}>
          <AddTodoDialog onAdd={this.addTodo} onClose={this.closeDialog} />
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addTodo: payload => dispatch(actions.addTodo(payload))
});

AddTodo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(AddTodo));
