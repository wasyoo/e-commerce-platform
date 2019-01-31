import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import styles from './ProductStyle';
import { localizationFr } from '../../../Config/config';

class ProductList extends Component {
  state = {

  };

  render() {
    const { products, classes, onDelete } = this.props;
    return (
      <div>
        <MaterialTable
          data={products}
          title="Liste des produits"
          localization={localizationFr}
          columns={[
            { title: 'Libellé', field: 'name', defaultSort: 'desc' },
            { title: 'Prix', field: 'price', type: 'numeric' },
            { title: 'Quantité', field: 'quantity', type: 'numeric' },
            {
              title: 'Image',
              field: 'image',
              sorting: false,
              searchable: false,
              render: (item) => (
                <CardMedia
                  className={classes.media}
                  image={item.image}
                  title={item.name}
                />
              ),
            },
            {
              title: 'Catégorie',
              field: 'category',
              render: (item) => item.category && item.category.name,
            },
          ]}
          actions={[
            {
              icon: 'info',
              tooltip: 'Voir détails',
              iconProps: {
                style: {
                  color: 'green',
                },
              },
              onClick: (e, item) => {
                alert(`You clicked product ${item.name}`);
              },
            },
            {
              icon: 'edit',
              tooltip: 'Modifier le produit',
              iconProps: {
                style: {
                  color: 'blue',
                },
              },
              onClick: (e, item) => {
                this.props.history.push({ pathname: '/admin/update-product', product: item });
              },
            },
            {
              icon: 'delete_forever',
              tooltip: 'Supprimer le produit',
              onClick: (e, item) => {
                e.preventDefault();
                // eslint-disable-next-line no-alert
                if (window.confirm(`Êtes-vous sûr de vouloir supprimer ce produit (${item.name})?`)) {
                  onDelete({
                    variables: {
                      id: item.id,
                    },
                  });
                }
              },
              iconProps: {
                style: {
                  color: 'red',
                },
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(ProductList));
