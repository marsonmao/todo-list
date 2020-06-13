import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import * as selectors from 'containers/App/selectors';
import * as actions from 'containers/App/duck';
import List from 'components/Lists/TodoList';
import Add from './Add';
import Header from './Header';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  spacing: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  list: {
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1000,
    bottom: theme.spacing(8),
    right: '15%',
    flexGrow: 0,
    flexShrink: 0,
  },
});

class TodoPage extends React.PureComponent {
  state = {
    isCheckHidden: false,
  };

  checkTodo = (id) => {
    this.props.checkTodo(id);
  };

  deleteTodo = (id) => {
    this.props.deleteTodo(id);
  };

  setCheckHidden = (_, value) => this.setState({ isCheckHidden: value })

  render() {
    const { classes, className, todos: inTodos } = this.props;
    const { isCheckHidden } = this.state;

    let todos = Object.values(inTodos);
    todos = todos.sort((a, b) => b.created_at - a.created_at);
    if (isCheckHidden) todos = todos.filter(item => !item.checked);
    todos = todos.map(todo => ({
      ...todo,
      onDelete: this.deleteTodo,
      onDone: this.checkTodo,
    }));

    return (
      <div className={classnames(classes.root, className)}>
        <Header
          className={classes.spacing}
          onChange={this.setCheckHidden}
        />
        <List
          className={classes.list}
          todos={todos}
        />
        <Add
          className={classes.fabButton}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: selectors.selectTodos(state),
});

const mapDispatchToProps = dispatch => ({
  checkTodo: id => dispatch(actions.checkTodo(id)),
  deleteTodo: id => dispatch(actions.deleteTodo(id)),
});

TodoPage.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  checkTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.object.isRequired, // use shape()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TodoPage));
