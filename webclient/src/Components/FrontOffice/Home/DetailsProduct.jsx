import React from 'react';
import {
  withStyles, Grid, Button, CardMedia, Typography,
} from '@material-ui/core';
import { Query, compose, graphql } from 'react-apollo';
import styles from './ProductStyle';
import GET_PRODUCT from '../../../graphql/queries/product/getProduct';
import ADD_ONE_ITEM from '../../../graphql/Client/mutations/cart/addItem';
import CHANGE_CART_STATUS from '../../../graphql/Client/mutations/cart/changeCartStatus';

const DetailsProduct = ({
  match, classes, addOneItem, changeCartStatus,
}) => (
  <Query query={GET_PRODUCT} variables={{ id: match.params.id }}>
    {({ data, loading }) => {
      if (loading) return <h1> Chargement... </h1>;
      if (data) {
        const {
          name, image, description, price, quantity,
        } = data.product;
        return (
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <CardMedia
                className={classes.media}
                image={image}
                title={name}
              />
            </Grid>
            <Grid item xs={6} className={classes.productDetails}>
              <h2 className={classes.productTitle}>{name}</h2>
              <p className={classes.productDesciption}>{description}</p>
              <strong className={classes.strong}>
                Prix:
                <span className={classes.productPrice}>{` ${price} DT`}</span>
              </strong>
              <strong className={classes.strong}>
                Disponibilté :
                <span className={classes.availability}>{quantity > 0 ? ' Disponible' : <Typography style={{ color: 'red', fontSize: 20 }}>EPUISE</Typography>}</span>
              </strong>
              <Button
                variant="outlined"
                disabled={quantity <= 0}
                className={classes.productButton}
                onClick={() => {
                  addOneItem({
                    variables: {
                      input: data.product,
                    },
                  });
                  changeCartStatus({ variables: { open: false } });
                }}
              >
                <i className="material-icons">
                  add_shopping_cart
                </i>
                Ajouter Au Panier
              </Button>
            </Grid>
          </Grid>
        );
      }
      return null;
    }}
  </Query>
);

export default compose(
  graphql(CHANGE_CART_STATUS, { name: 'changeCartStatus' }),
  graphql(ADD_ONE_ITEM, { name: 'addOneItem' }),
)(withStyles(styles)(DetailsProduct));
