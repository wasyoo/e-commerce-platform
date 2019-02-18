import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { compose, graphql, Query } from 'react-apollo';
import {
  withStyles, MenuItem, Menu, Link, Chip, Avatar,
} from '@material-ui/core';
import styles from './navbarStyle';
import UPDATE_NETWORK_STATUS from '../../../graphql/Client/mutations/user/udpdateNetworkState';
import GET_ME from '../../../graphql/Client/queries/user/getMe';

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
        typeOfAuth: null,
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
        <Query query={GET_ME}>
          {
            ({ data }) => {
              const { firstName, lastName, avatar } = data.me.user;
              return (
                <Chip
                  avatar={
                    avatar
                      ? <Avatar alt={firstName} src={avatar} />
                      : <Avatar>{firstName.slice(0, 1).toUpperCase()}</Avatar>
                  }
                  label={`${firstName} ${lastName}`}
                  onClick={this.handleProfileMenuOpen}
                  className={classes.chip}
                />
              );
            }
          }

        </Query>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>
            <Link component={RouterLink} className={classes.connexion} color="inherit" variant="body1" to="/edit-user">
              Modifier
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleMenuClose}>
            <Link component={RouterLink} className={classes.connexion} color="inherit" variant="body1" to="/edit-password">
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
