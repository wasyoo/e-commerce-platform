import React from 'react';
import { withRouter } from 'react-router-dom';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';
import styles from '../Product/ProductStyle';
import { localizationFr } from '../../../Config/config';

const CategoryTable = ({ categories, onDelete, history }) => {
  return (
    <div>
      <MaterialTable
        data={categories}
        title="Liste des Catégories"
        localization={localizationFr}
        columns={[
          { title: 'Libellé', field: 'name', defaultSort: 'desc' },
          {
            title: 'Nombres des Produit',
            field: 'produits',
            render: (item) => item.products.length,
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
              alert(`You clicked category ${item.name}`);
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
              history.push({ pathname: '/admin/update-category', category: item });
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
};

export default withStyles(styles)(withRouter(CategoryTable));
