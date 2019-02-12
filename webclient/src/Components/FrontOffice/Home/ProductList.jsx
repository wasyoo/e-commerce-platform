import React from 'react';
import { Mutation, compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  withStyles, Card, CardActionArea, CardActions,
  CardContent, CardMedia, Button, Typography, Tooltip,
} from '@material-ui/core';
import styles from './HomeStyle';
import ADD_ONE_ITEM from '../../../graphql/Client/mutations/cart/addItem';
import CHANGE_CART_STATUS from '../../../graphql/Client/mutations/cart/changeCartStatus';

const ProductList = ({ classes, product, changeCartStatus }) => (
  <Card className={classes.card}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.name}
      >
        <Tooltip title="Ajouter au panier" placement="top-end">
          <Mutation mutation={ADD_ONE_ITEM} variables={{ input: product }}>
            {(addOneItem) => (
              <Button
                size="small"
                disabled={product.quantity <= 0}
                className={classes.addShoppingCart}
                onClick={(e) => {
                  e.preventDefault();
                  addOneItem();
                  changeCartStatus();
                }}
              >
                <i className="material-icons">
                  add_shopping_cart
                </i>
              </Button>
            )}
          </Mutation>
        </Tooltip>
      </CardMedia>
    </CardActionArea>
    <CardContent className={classes.info}>
      <Typography gutterBottom variant="h5" component="h2">
        { product.name }
      </Typography>
      <Typography component="small">
        { `${product.price} dt` }
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">
        <Link to={`/product/${product.id}`}>Détails</Link>
      </Button>
    </CardActions>
  </Card>
);

export default compose(
  graphql(CHANGE_CART_STATUS, { name: 'changeCartStatus' })
)(withStyles(styles)(ProductList));
