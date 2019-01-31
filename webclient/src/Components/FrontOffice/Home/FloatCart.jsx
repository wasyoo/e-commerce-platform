import React from 'react';
import { withStyles, Drawer } from '@material-ui/core';
import { Query, Mutation } from 'react-apollo';
import Cart from '../Cart/Cart';
import GET_CART_STATUS from '../../../graphql/Client/queries/cart/getCartStatus';
import CHANGE_CART_STATUS from '../../../graphql/Client/mutations/cart/changeCartStatus';

const styles = {
  drawer: {
    width: '50vw',
    height: '100%',
    overflowY: 'scroll',
    backgroundColor: '#1b1a20',
  },
};

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
