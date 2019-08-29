import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MoreVert from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  root: {},
  more: {
    marginLeft: "auto"
  },
  checked: {
    backgroundColor: grey[300]
  }
});

class Todo extends React.PureComponent {
  state = {
    anchorEl: null,
    confirmWindowOpen: false
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  openConfirmWindow = () => {
    this.setState({ confirmWindowOpen: true });
    this.closeMenu();
  };

  closeConfirmWindow = () => {
    this.setState({ confirmWindowOpen: false });
  };

  onDelete = () => {
    this.props.onDelete(this.props.id);
    this.closeConfirmWindow();
  };

  onDone = () => {
    this.props.onDone(this.props.id);
  };

  renderMenu = () => {
    const { anchorEl } = this.state;
    return (
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={this.closeMenu}>
        <MenuItem key="delete" onClick={this.openConfirmWindow}>
          Delete
        </MenuItem>
      </Menu>
    );
  };

  renderConfirmWindow = () => {
    const { confirmWindowOpen } = this.state;
    return (
      <Dialog open={confirmWindowOpen} onClose={this.closeConfirmWindow}>
        <DialogContent>
          <DialogContentText>
            This operation can not be undone, are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeConfirmWindow} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={this.onDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderTitle = () => {
    const { title } = this.props;
    if (!title)
      return (
        <Typography
          style={{ fontStyle: "italic" }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          Empty
        </Typography>
      );
    return (
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
    );
  };

  renderDescription = () => {
    const { description } = this.props;
    if (!description)
      return (
        <Typography style={{ fontStyle: "italic" }} component="pre">
          Empty
        </Typography>
      );
    return <Typography component="pre">{description}</Typography>;
  };

  render() {
    const { classes, id, checked } = this.props;
    return (
      <Card
        className={classNames(classes.root, {
          [classes.checked]: checked
        })}
        id={id}
      >
        <CardContent>
          {this.renderTitle()}
          {this.renderDescription()}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={this.onDone}
            disabled={checked}
          >
            DONE
          </Button>
          <IconButton className={classes.more} onClick={this.openMenu}>
            <MoreVert fontSize="small" />
          </IconButton>
        </CardActions>
        {this.renderMenu()}
        {this.renderConfirmWindow()}
      </Card>
    );
  }
}

Todo.propTypes = {
  classes: PropTypes.object.isRequired
  // title
  // description
  // onEdit
  // onDelete
};

export default withStyles(styles)(Todo);
