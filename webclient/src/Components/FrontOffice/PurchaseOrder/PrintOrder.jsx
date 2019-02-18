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
import GET_ME from '../../../graphql/Client/queries/user/getMe';
import CLEAN_CART from '../../../graphql/Client/mutations/cart/cleanCart';
import SEND_ATTACH_EMAIL from '../../../graphql/mutations/order/sendAttachEmail';

const downloadFile = (canvas) => {
  const imgData = canvas.toDataURL('image/png');
  // eslint-disable-next-line new-cap
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.addImage(imgData, 'PNG', 0, 0);
  pdf.save('download.pdf');
  return pdf.output('blob');
};

const PrintOrder = ({
  history, classes, changeCartStatus, cleanCart, sendAttachEmail, getMe,
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

                      const pdfFile = await downloadFile(canvas);

                      await changeCartStatus({ variables: { open: true } });

                      await cleanCart({
                        variables: {
                          items: [],
                          totalPrice: 0,
                          totalQuantity: 0,
                        },
                      });

                      history.push('/');

                      await sendAttachEmail({
                        variables: {
                          input: {
                            file: pdfFile,
                            email: getMe.me.user.email,
                            name: `${getMe.me.user.firstName} ${getMe.me.user.lastName}`,
                          },
                        },
                      });
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
  graphql(CLEAN_CART, { name: 'cleanCart' }),
  graphql(SEND_ATTACH_EMAIL, { name: 'sendAttachEmail' }),
  graphql(
    GET_ME, {
      props: ({ data: getMe }) => ({
        getMe,
      }),
    }
  )
)(withStyles(styles)(withRouter(PrintOrder)));
