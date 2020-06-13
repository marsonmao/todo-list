import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MoreVert from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({});

class COM extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return null;
  }
}

COM.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(COM));
