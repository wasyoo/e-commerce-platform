import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Product from './Product';
import styles from './HomeStyle';

const Home = ({ classes }) => (
  <div className={classes.homeSection}>
    <Product />
  </div>
);

export default withStyles(styles)(Home);
