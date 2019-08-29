import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MoreVert from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Todo from "components/Todo";
import AddTodo from "containers/AddTodo";
import * as selectors from "containers/App/selectors";
import * as actions from "containers/App/duck";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  todo: {
    width: "100%"
  },
  spacing: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  list: {
    height: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    marginBottom: theme.spacing(2)
  },
  fabButton: {
    position: "absolute",
    zIndex: 1000,
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  },
  checkBox: {
    marginLeft: "auto"
  }
});

class TodoList extends React.Component {
  state = {
    hideChecked: false,
    anchorEl: null,
  };

  checkTodo = id => {
    this.props.checkTodo(id);
  };

  deleteTodo = id => {
    this.props.deleteTodo(id);
  };

  toggleCheckedVisibility = () => {
    this.setState({ hideChecked: !this.state.hideChecked });
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  renderHeader = () => {
    const { classes } = this.props;
    const { hideChecked } = this.state;
    return (
      <div className={classNames(classes.spacing, classes.header)}>
        <Typography variant="h5" gutterBottom>
          My todos
        </Typography>
        <FormControlLabel
          className={classes.checkBox}
          control={
            <Checkbox
              checked={hideChecked}
              onChange={this.toggleCheckedVisibility}
            />
          }
          label="Hide checked"
        />
        <IconButton onClick={this.openMenu}>
          <MoreVert fontSize="small" />
        </IconButton>
      </div>
    );
  };

  renderPlaceHolder = () => {
    const { classes } = this.props;
    return (
      <Typography className={classes.spacing} gutterBottom>
        Create some todos!
      </Typography>
    );
  };

  renderList = () => {
    const { classes, todos } = this.props;
    let items = Object.values(todos);
    if (items.length === 0) return this.renderPlaceHolder();

    items = items.sort((a, b) => b.created_at - a.created_at);
    const { hideChecked } = this.state;
    if (hideChecked) {
      items = items.filter(item => !item.checked);
      if (items.length === 0) {
        return (
          <Typography className={classes.spacing} gutterBottom>
            All todos are chcked!
          </Typography>
        );
      }
    }
    items = items.map(({ id, title, description, checked }) => (
      <ListItem key={id}>
        <Todo
          classes={{ root: classes.todo }}
          id={id}
          title={title}
          description={description}
          checked={checked}
          onDone={this.checkTodo}
          onDelete={this.deleteTodo}
        />
      </ListItem>
    ));
    return <List className={classes.list}>{items}</List>;
  };

  renderMenu = () => {
    const { clearLocalStorage } = this.props;
    const { anchorEl } = this.state;
    // NOTE destructive but not implementing confirm window since this is just a demo
    return (
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={this.closeMenu}>
        <MenuItem key="clearLocalStorage" onClick={clearLocalStorage}>
          Clear Local Storage
        </MenuItem>
      </Menu>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderHeader()}
        {this.renderList()}
        <AddTodo classes={{ root: classes.fabButton }} />
        {this.renderMenu()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: selectors.selectTodos(state)
});

const mapDispatchToProps = dispatch => ({
  checkTodo: id => dispatch(actions.checkTodo(id)),
  deleteTodo: id => dispatch(actions.deleteTodo(id)),
  clearLocalStorage: () => dispatch(actions.clearLocalStorage()),
});

TodoList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TodoList));
