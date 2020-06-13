import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as actions from 'containers/App/duck';
import Button from 'components/Buttons/AddTodo';

const styles = theme => ({
});

class AddTodo extends React.PureComponent {
  render() {
    const { classes, className, addTodo } = this.props;
    return (
      <Button
        className={className}
        addTodo={addTodo}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addTodo: payload => dispatch(actions.addTodo(payload)),
});

AddTodo.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  addTodo: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(AddTodo));
