import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Todo from 'components/Cards/Todo';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  todo: {
    width: '100%',
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
});

class TodoList extends React.Component {
  renderPlaceHolder = () => {
    const { classes } = this.props;
    return (
      <Typography className={classes.spacing} gutterBottom>
        Create some todos!
      </Typography>
    );
  };

  render() {
    const { classes, className, todos: inTodos } = this.props;
    const todos = inTodos.map(item => (
      <ListItem key={item.id}>
        <Todo classes={{ root: classes.todo }} {...item} />
      </ListItem>
    ));
    return (
      <div className={classnames(classes.root, className)}>
        <List className={classes.list}>{todos}</List>
      </div>
    );
  }
}

TodoList.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default withStyles(styles)(TodoList);
