import React from 'react';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import getProducts from '../../../graphql/queries/product/getProducts';
import ProductList from './ProductList';

const Product = () => (
  <div>
    <Query query={getProducts}>
      {({ loading, data }) => {
        if (loading) return <h1> Chargement... </h1>;
        if (data.products.length) {
          return (
            <Grid container spacing={8}>
              {
                data.products.map((product) => (
                  <Grid key={product.id} item xs={12} md={3} sm={6}>
                    <ProductList product={product} />
                  </Grid>
                ))
              }
            </Grid>
          );
        }
        return <p>{'Il n\'y a pas de produit pour le moment'}</p>;
      }
      }
    </Query>
  </div>
);

export default Product;
