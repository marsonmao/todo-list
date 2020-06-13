import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MoreVert from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  checkBox: {
    marginLeft: 'auto',
  },
});

class TodoListHeader extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  openMenu = event => this.setState({ anchorEl: event.currentTarget })

  closeMenu = () => this.setState({ anchorEl: null })

  render() {
    const {
      classes,
      className,
      isCheckHidden,
      toggleHidden,
      clearLocalStorage,
    } = this.props;
    const {
      anchorEl,
    } = this.state;
    return (
      <div className={classnames(classes.header, className)}>
        <Typography variant="h5" gutterBottom>
          My todos
        </Typography>
        <FormControlLabel
          className={classes.checkBox}
          control={<Checkbox checked={isCheckHidden} onChange={toggleHidden} />}
          label="Hide checked"
        />
        <IconButton onClick={this.openMenu}>
          <MoreVert fontSize="small" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={this.closeMenu}>
          <MenuItem key="clearLocalStorage" onClick={clearLocalStorage}>
            Clear Local Storage
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

TodoListHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  isCheckHidden: PropTypes.bool.isRequired,
  toggleHidden: PropTypes.func.isRequired,
  clearLocalStorage: PropTypes.func.isRequired,
};

export default withStyles(styles)(TodoListHeader);
