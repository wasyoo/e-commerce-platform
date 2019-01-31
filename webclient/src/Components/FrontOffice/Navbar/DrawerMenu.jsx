import React, { Component } from 'react';
import {
  withStyles, IconButton, Drawer, Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '../../BackOffice/Header/MenuList';
import styles from './navbarStyle';

class DrawerMenu extends Component {
  state = {
    drawer: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      drawer: open,
    });
  };

  render() {
    const { drawer } = this.state;
    const { classes } = this.props;
    return (
      <>
        <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Open drawer">
          <MenuIcon />
        </IconButton>
        <Drawer open={drawer} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.toggleDrawer(false)}>
                <i className="material-icons">
                close
                </i>
              </IconButton>
            </div>
            <Divider />
            <MenuList toggleDrawer={(open) => this.toggleDrawer(open)} />
          </div>
        </Drawer>
      </>
    );
  }
}

export default withStyles(styles)(DrawerMenu);
