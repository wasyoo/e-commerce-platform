import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import {
  withStyles, AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Drawer, Divider,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import getNetworkSatus from '../../../graphql/Client/queries/user/getNetworkStatus';
import UpdateNeworkStatus from '../../../graphql/Client/mutations/user/udpdateNetworkState';
import MenuList from './MenuList';
import styles from './HeaderStyle';


class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
    drawer: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      drawer: open,
    });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
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
    const { classes, networkStatus: { networkStatus } } = this.props;
    const { anchorEl, drawer } = this.state;
    const anchor = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} onClick={this.toggleDrawer(true)} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {' '}
            </Typography>
            {networkStatus.isConnected && (
              <div>
                <IconButton
                  aria-owns={anchor ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <i className="fas fa-user" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={anchor}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Mon Profil</MenuItem>
                  <MenuItem onClick={this.logout}>Deconnexion</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer open={drawer} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.toggleDrawer(false)}>
                <Close />
              </IconButton>
            </div>
            <Divider />
            <MenuList toggleDrawer={(open) => this.toggleDrawer(open)} />
          </div>
        </Drawer>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  graphql(UpdateNeworkStatus, { name: 'updateNeworkStatus' }),
  graphql(
    getNetworkSatus, {
      props: ({ data: networkStatus }) => ({
        networkStatus,
      }),
    }
  )
)(withStyles(styles)(withRouter(MenuAppBar)));
