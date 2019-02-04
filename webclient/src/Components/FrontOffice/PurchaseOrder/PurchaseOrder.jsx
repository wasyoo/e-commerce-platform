import React from 'react';
import { Query } from 'react-apollo';
import {
  withStyles, Table, TableBody, List, ListItem, ListItemIcon,
  ListItemText, TableCell, TableHead, TableRow, Paper, Grid,
} from '@material-ui/core';
import styles from './PurchaseOrderStyle';
import GET_CART from '../../../graphql/Client/queries/cart/getCart';
import GET_ME from '../../../graphql/Client/queries/user/getMe';

const PurchaseOrder = ({ classes }) => (
  <div className={classes.document} id="capture_order">
    <>
      <div className={classes.header}>
        <div className="logo">
          <i className="material-icons">
            mouse
          </i>
          {' '}
          <span className={classes.logo}>CyberShop</span>
        </div>
        <div>
          <h1> Bon de commande </h1>
        </div>
      </div>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper className={classes.companyInfo}>
            <List component="ul">
              <ListItem li>
                <ListItemIcon>
                  <i className="material-icons">
                    business
                  </i>
                </ListItemIcon>
                <ListItemText primary="10 accommodare ea est, mel mollis referrentur te" />
              </ListItem>
            </List>
            <ListItem li>
              <ListItemIcon>
                <i className="material-icons">
                  phone
                </i>
              </ListItemIcon>
              <ListItemText primary="22 222 222 / 71 717 171" />
            </ListItem>
            <ListItem li>
              <ListItemIcon>
                <i className="material-icons">
                  mail
                </i>
              </ListItemIcon>
              <ListItemText primary="contact@cybershop.com.tn" />
            </ListItem>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Query query={GET_ME}>
            {({ data }) => (
              <Paper className={classes.companyInfo}>
                <h3> Adresse de livraison </h3>
                <List component="ul">
                  <ListItem li>
                    <ListItemIcon>
                      <i className="material-icons">
                        assignment_ind
                      </i>
                    </ListItemIcon>
                    <ListItemText primary={`${data.me.user.firstName} ${data.me.user.lastName}`} />
                  </ListItem>
                  <ListItem li>
                    <ListItemIcon>
                      <i className="material-icons">
                        home
                      </i>
                    </ListItemIcon>
                    <ListItemText primary={data.me.user.address} />
                  </ListItem>
                </List>
                <ListItem li>
                  <ListItemIcon>
                    <i className="material-icons">
                      phone
                    </i>
                  </ListItemIcon>
                  <ListItemText primary={data.me.user.phone} />
                </ListItem>
                <ListItem li>
                  <ListItemIcon>
                    <i className="material-icons">
                      mail
                    </i>
                  </ListItemIcon>
                  <ListItemText primary={data.me.user.email} />
                </ListItem>
              </Paper>
            )}
          </Query>
        </Grid>
      </Grid>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Article</TableCell>
              <TableCell align="right">Quantité</TableCell>
              <TableCell align="right">Prix</TableCell>
              <TableCell align="right">Montant</TableCell>
            </TableRow>
          </TableHead>
          <Query query={GET_CART}>
            {({ data, loading }) => {
              if (loading) return null;
              if (data) {
                return (
                  <TableBody>
                    {data.cart.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.product.name}
                        </TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.product.price}</TableCell>
                        <TableCell align="right">{item.product.price * item.quantity}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell align="right"><strong>Montant Total</strong></TableCell>
                      <TableCell align="right"><strong>{data.cart.totalPrice}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                );
              }
              return <h1>Panier vide</h1>;
            }}
          </Query>
        </Table>
      </Paper>
    </>

  </div>
);


export default withStyles(styles)(PurchaseOrder);
