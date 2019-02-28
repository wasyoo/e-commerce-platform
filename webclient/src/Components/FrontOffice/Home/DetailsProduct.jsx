import React from 'react';
import {
  withStyles, Grid, Button, CardMedia, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Query, compose, graphql } from 'react-apollo';
import ReactImageMagnify from 'react-image-magnify';
import styles from './ProductStyle';
import GET_PRODUCT from '../../../graphql/queries/product/getProduct';
import ADD_ONE_ITEM from '../../../graphql/Client/mutations/cart/addItem';
import CHANGE_CART_STATUS from '../../../graphql/Client/mutations/cart/changeCartStatus';
import GET_SIMILAR_PRODUCT from '../../../graphql/queries/product/getSimilarProduct';

const DetailsProduct = ({
  match, classes, addOneItem, changeCartStatus,
}) => (
  <Query query={GET_PRODUCT} variables={{ id: match.params.id }}>
    {({ data, loading }) => {
      if (loading) return <h1> Chargement... </h1>;
      if (data) {
        const {
          id, name, image, description, price, quantity, category, brand,
        } = data.product;
        return (
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <ReactImageMagnify
                className={classes.imageMagnify}
                {...{
                  smallImage: {
                    alt: name,
                    isFluidWidth: true,
                    src: image,
                  },
                  largeImage: {
                    src: image,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.productDetails}>
              <h2 className={classes.productTitle}>{name}</h2>
              {brand && (
                <CardMedia
                  className={classes.media}
                  image={`http://localhost:4000/image/${brand.filename}`}
                  title={brand.name}
                />
              )}
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
            <Grid item xs={12}>
              <Query
                query={GET_SIMILAR_PRODUCT}
                variables={{ idCategory: category.id, idProduct: id }}
              >
                {
                  ({ data: { similarProduct }, loading: lg }) => {
                    if (lg) return <h1>Chargement...</h1>;
                    if (similarProduct.length > 0) {
                      return (
                        <div className={classes.similarProductContent}>
                          <h1>Produits similaire</h1>
                          <div className={classes.similarProducts}>
                            {
                              similarProduct.map((product) => (
                                <Grid item xs={6} md={3}>
                                  <Link to={`/product/${product.id}`} className={classes.similarProductLink}>
                                    <div className={classes.similarProductItem}>
                                      <CardMedia
                                        className={classes.similarProductMedia}
                                        image={product.image}
                                        title={product.name}
                                      />
                                      <strong
                                        className={classes.similarProductName}
                                      >
                                        {product.name}
                                      </strong>
                                      <span className={classes.similarProductPrice}>{`${product.price} Dinars`}</span>
                                    </div>
                                  </Link>
                                </Grid>
                              ))
                            }
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }
                }
              </Query>
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
