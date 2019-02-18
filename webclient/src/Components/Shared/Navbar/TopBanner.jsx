import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './navbarStyle';

const TopBanner = ({ classes }) => (
  <div className={classes.topBar}>
    <div className={classes.topBarInfo}>
      <span className={classes.topBarInfo}>
        <i className="material-icons">
          email
        </i>
        contact@cybershop.tn
      </span>
      <span className={classes.topBarInfo}>
        <i className="material-icons">
          phone
        </i>
        +216 22 222 222 / +216 31 333 333
      </span>
    </div>
    <Link className={classes.topBarBtn} to="/contact">Contact</Link>
  </div>
);

export default withStyles(styles)(TopBanner);
