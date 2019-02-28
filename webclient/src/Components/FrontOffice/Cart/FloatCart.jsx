import React from 'react';
import { withStyles, Drawer, Button } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import Cart from './Cart';
import styles from './CartStyle';
import GET_CART_STATUS from '../../../graphql/Client/queries/cart/getCartStatus';
import CHANGE_CART_STATUS from '../../../graphql/Client/mutations/cart/changeCartStatus';

const FloatCart = ({ classes }) => (
  <Query query={GET_CART_STATUS}>
    {
      ({ data }) => (
        <Mutation mutation={CHANGE_CART_STATUS} variables={{ open: data.cartStatus.open }}>
          {
            (changeCartStatus) => (
              <Drawer
                anchor="right"
                open={data.cartStatus.open}
                onClose={(e) => {
                  e.preventDefault();
                  changeCartStatus();
                }}
              >
                <div className={classes.drawer} tabIndex={0} role="button">
                  <Button
                    className={classes.btnClose}
                    onClick={() => {
                      changeCartStatus();
                    }}
                  >
                    <i className="material-icons">
                    close
                    </i>
                  </Button>
                  <Cart />
                </div>
              </Drawer>
            )
          }
        </Mutation>
      )
    }
  </Query>
);

export default withStyles(styles)(FloatCart);
