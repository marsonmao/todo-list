import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import AddTodoDialog from 'components/Dialogs/AddTodo';

const styles = theme => ({
  root: {},
});

class AddTodoButton extends React.PureComponent {
  state = {
    dialogOpen: false,
  };

  addTodo = (payload) => {
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
    const { classes, className } = this.props;
    const { dialogOpen } = this.state;
    return (
      <React.Fragment>
        <Fab color="primary" className={classnames(classes.root, className)}>
          <AddIcon onClick={this.openDialog} />
        </Fab>
        <Dialog open={dialogOpen} onClose={this.closeDialog}>
          <AddTodoDialog onAdd={this.addTodo} onClose={this.closeDialog} />
        </Dialog>
      </React.Fragment>
    );
  }
}

AddTodoButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  addTodo: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddTodoButton);
