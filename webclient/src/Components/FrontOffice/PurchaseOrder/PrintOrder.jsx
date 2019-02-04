import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import {
  Query, Mutation, compose, graphql,
} from 'react-apollo';
import { withRouter } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PurchaseOrder from './PurchaseOrder';
import styles from './PurchaseOrderStyle';
import CHANGE_CART_STATUS from '../../../graphql/Client/mutations/cart/changeCartStatus';
import ADD_ORDER from '../../../graphql/mutations/order/addOrder';
import GET_CART from '../../../graphql/Client/queries/cart/getCart';
import CLEAN_CART from '../../../graphql/Client/mutations/cart/cleanCart';

const downloadFile = (canvas) => {
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.addImage(imgData, 'PNG', 0, 0);
  pdf.save('download.pdf');
};

const PrintOrder = ({
  history, classes, changeCartStatus, cleanCart,
}) => (
  <div className={classes.printOrderSection}>
    <div className={classes.buttonAction}>
      <Query query={GET_CART}>
        {
          ({ data: { cart } }) => (
            <Mutation mutation={ADD_ORDER}>
              {
                (addOrder, { loading }) => (
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginBottom: 10 }}
                    onClick={async () => {
                      const input = document.getElementById('capture_order');
                      const canvas = await html2canvas(input);

                      await downloadFile(canvas);

                      const orderItems = cart.items.map((item) => ({
                        product: item.product.id,
                        quantity: item.quantity,
                      }));

                      await addOrder({
                        variables: {
                          input: {
                            items: orderItems,
                            totalPrice: cart.totalPrice,
                            totalQuantity: cart.totalQuantity,
                          },
                        },
                      });

                      await changeCartStatus({ variables: { open: true } });

                      await cleanCart({
                        variables: {
                          items: [],
                          totalPrice: 0,
                          totalQuantity: 0,
                        },
                      });

                      history.push('/');
                    }}
                  >
                    {(loading) ? 'Validation en cours...' : 'Valider'}
                  </Button>
                )
              }
            </Mutation>
          )
        }
      </Query>
      <Button
        variant="outlined"
        onClick={() => {
          changeCartStatus({ variables: { open: false } });
        }}
      >
        Modifier Panier
      </Button>
    </div>
    <PurchaseOrder />
  </div>
);
export default compose(
  graphql(CHANGE_CART_STATUS, { name: 'changeCartStatus' }),
  graphql(CLEAN_CART, { name: 'cleanCart' })
)(withStyles(styles)(withRouter(PrintOrder)));
