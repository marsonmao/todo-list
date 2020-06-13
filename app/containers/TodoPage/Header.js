import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as actions from 'containers/App/duck';
import Header from 'components/Others/TodoListHeader';

const styles = theme => ({});

class TodoListHeader extends React.PureComponent {
  state = {
    isCheckHidden: false,
  };

  toggleHidden = () => {
    const { isCheckHidden } = this.state;
    this.setState({ isCheckHidden: !isCheckHidden });
    this.props.onChange({}, !isCheckHidden); // mock (event, value)
  };

  render() {
    const {
      className,
      clearLocalStorage,
    } = this.props;
    const { isCheckHidden } = this.state;

    return (
      <Header
        className={className}
        isCheckHidden={isCheckHidden}
        toggleHidden={this.toggleHidden}
        clearLocalStorage={clearLocalStorage}
      />
    );
  }
}

TodoListHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  clearLocalStorage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  clearLocalStorage: () => dispatch(actions.clearLocalStorage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TodoListHeader));
