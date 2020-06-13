/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Loading from 'components/Loading';
import TodoPage from 'containers/TodoPage';
import GlobalStyle from '../../global-styles';
import * as selectors from './selectors';

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
  const { classes, isLoading } = props;
  return (
    <div className={classes.paper}>
      <GlobalStyle />
      <CssBaseline />
      <Paper square className={classes.paper}>
        {isLoading && <Loading />}
        {!isLoading && <TodoPage className={classes.todoList} />}
      </Paper>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: selectors.selectIsLoading(state),
});

export default connect(mapStateToProps)(withStyles(styles)(App));
