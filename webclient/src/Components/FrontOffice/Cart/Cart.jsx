import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { List, Button } from '@material-ui/core';
import styles from './CartStyle';
import GET_CART from '../../../graphql/Client/queries/cart/getCart';
import CartItem from './CartItem';

const Cart = ({ classes, history }) => (
  <Query query={GET_CART}>
    {
      ({ data: { cart }, loading }) => {
        if (loading) return <h1> Chargement... </h1>;
        return (
          <div className={classes.cartContent}>
            <div className={classes.cartHeader}>
              <i className={`material-icons ${classes.iconShoppingCart}`}>
                shopping_cart
              </i>
              <span className={classes.totalQuantity}>{cart.totalQuantity}</span>
            </div>
            {
              cart.items.length > 0 ? (
                <List className={classes.cartList}>
                  {
                    cart.items.map((item) => <CartItem item={item} />)
                  }
                </List>
              ) : (
                <div className={classes.emptyCart}> Panier vide </div>
              )
            }
            <div className={classes.cartFooter}>
              <div className={classes.cartFooterTotal}>
                <div className={classes.sub}>TOTAL TTC:</div>
                <div className={classes.subPrice}>{`${cart.totalPrice} DT`}</div>
              </div>
              <Button
                disabled={cart.items.length === 0}
                className={classes.validateBtn}
                onClick={(e) => {
                  e.preventDefault();
                  history.push('/print');
                }}
              >
                Valider
              </Button>
            </div>
          </div>
        );
      }
    }
  </Query>
);
export default withStyles(styles)(withRouter(Cart));
