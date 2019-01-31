import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import {
  withStyles, MenuItem, Menu, Link, IconButton,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from './navbarStyle';
import UPDATE_NETWORK_STATUS from '../../../graphql/Client/mutations/user/udpdateNetworkState';

class RenderMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.setState({ anchorEl: null });
    this.props.updateNeworkStatus({
      variables: {
        isConnected: false,
        role: null,
      },
    })
      .then(() => this.props.history.push('/'));
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    return (
      <>
        <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>
            <Link component={RouterLink} className={classes.connexion} color="inherit" variant="body1" to="/signin">
              Modifier
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleMenuClose}>
            <Link component={RouterLink} className={classes.connexion} color="inherit" variant="body1" to="/register">
              Changer mot de passe
            </Link>
          </MenuItem>
          <MenuItem onClick={this.logout} color="inherit" variant="body1">Deconnexion</MenuItem>
        </Menu>
      </>
    );
  }
}

export default compose(
  graphql(UPDATE_NETWORK_STATUS, { name: 'updateNeworkStatus' }),
)(withStyles(styles)(withRouter(RenderMenu)));
