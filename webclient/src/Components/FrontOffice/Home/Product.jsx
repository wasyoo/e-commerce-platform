import React from 'react';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import getProducts from '../../../graphql/queries/product/getProducts';
import ProductList from './ProductList';

const Product = () => (
  <div>
    <Query query={getProducts}>
      {({ loading, data }) => {
        if (loading) return <h1> Chargement... </h1>;
        return (
          <Grid container spacing={24}>
            {
              data.products.map((product) => (
                <Grid key={product.id} item xs={12} sm={3}>
                  <ProductList product={product} />
                </Grid>
              ))
            }
          </Grid>
        );
      }
      }
    </Query>
  </div>
);

export default withStyles()(Product);
