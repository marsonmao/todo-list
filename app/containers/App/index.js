/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import TodoList from "containers/TodoList";
import GlobalStyle from '../../global-styles';

const styles = theme => ({
  '@global': {},
  paper: {
    width: '100%',
    height: '100%',
  },
  todoList: {
    width: '70%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

function App(props) {
  const { classes } = props;
  return (
    <div className={classes.paper}>
      <GlobalStyle />
      <CssBaseline />
      <Paper square className={classes.paper}>
        <TodoList classes={{ root: classes.todoList }} />
      </Paper>
    </div>
  );
}

export default withStyles(styles)(App);
