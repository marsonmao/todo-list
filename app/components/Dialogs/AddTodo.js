import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {},
  actions: {
    // weird
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
  },
});

class AddTodoDialog extends React.PureComponent {
  state = {
    title: '',
    description: '',
  };

  handleTextChange = key => (e) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  onAdd = () => {
    const { title, description } = this.state;
    this.props.onAdd({
      title,
      description,
    });
  };

  render() {
    const { classes, onClose } = this.props;
    const { title, description } = this.state;
    return (
      <React.Fragment>
        <DialogTitle id="form-dialog-title">Create a todo</DialogTitle>
        <DialogContent>
          <TextField
            variant="filled"
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={this.handleTextChange('title')}
          />
          <TextField
            variant="filled"
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            rowsMax={4}
            value={description}
            onChange={this.handleTextChange('description')}
          />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={this.onAdd} color="primary">
            Save
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

AddTodoDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddTodoDialog);
