import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  withStyles, MenuItem, Menu, Link, IconButton,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import styles from './navbarStyle';

class NoConnectedMenu extends Component {
  state = {
    mobileMoreAnchorEl: null,
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    return (
      <>
        <div className={classes.sectionMobile}>
          <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem>
            <Link component={RouterLink} className={classes.connexion} color="inherit" variant="body1" to="/signin">
            Connexion
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <Link component={RouterLink} className={classes.connexion} color="inherit" variant="body1" to="/register">
            Inscription
            </Link>
          </MenuItem>
        </Menu>
      </>
    );
  }
}

export default withStyles(styles)(NoConnectedMenu);
