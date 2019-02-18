import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from './navbarStyle';

const menu = [
  {
    text: 'Produit',
    icon: 'fas fa-box',
    open: false,
    dropdown: [
      {
        text: 'Liste',
        link: '/admin/product',
      },
      {
        text: 'Ajouter',
        link: '/admin/add-product',
      },
    ],
  },
  {
    text: 'catégorie',
    icon: 'fas fa-tags',
    open: false,
    dropdown: [
      {
        text: 'Liste',
        link: '/admin/categories',
      },
      {
        text: 'Ajouter',
        link: '/admin/add-category',
      },
    ],
  },
  {
    text: 'Commandes',
    icon: 'fas fa-clipboard-list',
    open: false,
    dropdown: [
      {
        text: 'Liste',
        link: '/admin/order',
      },
    ],
  },
  {
    text: 'Clients',
    icon: 'fas fa-users',
    open: false,
    dropdown: [
      {
        text: 'Liste',
        link: '/admin/client',
      },
    ],
  },
];

class MenuList extends React.Component {
  state = {
    menu,
    open: null,
  };

  handleNestedList = (item) => {
    if (this.state.open === item) { item = null; }
    this.setState({ open: item });
  };

  render() {
    const { classes, toggleDrawer } = this.props;
    const { menu, open } = this.state;
    return (
      <List>
        {
          menu.map((el, i) => (
            <div key={i}>
              <ListItem key={i} button onClick={() => this.handleNestedList(i)}>
                <ListItemIcon>
                  <i className={el.icon} />
                </ListItemIcon>
                <ListItemText primary={el.text} />
                {i === open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={i === open} timeout="auto">
                <List component="div" disablePadding>
                  {
                    el.dropdown.map((el, i) => (
                      <Link to={el.link} key={i} onClick={toggleDrawer(false)}>
                        <ListItem button className={classes.nested}>
                          <ListItemText primary={el.text} />
                        </ListItem>
                      </Link>
                    ))
                  }
                </List>
              </Collapse>
            </div>
          ))
        }
      </List>
    );
  }
}

export default withStyles(styles)(withRouter(MenuList));
