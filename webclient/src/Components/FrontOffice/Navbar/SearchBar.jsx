import React from 'react';
import { withStyles, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styles from './navbarStyle';

const SearchBar = ({ classes }) => (
  <div className={classes.search}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      placeholder="Recherche…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
    />
  </div>
);

export default withStyles(styles)(SearchBar);
