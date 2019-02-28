import React from 'react';
import { Query, compose, graphql } from 'react-apollo';
import MaterialTable from 'material-table';
import { CardMedia, withStyles } from '@material-ui/core';
import { localizationFr } from '../../../Config/config';
import GET_BRAND from '../../../graphql/queries/brand/getBrands';
import DELETE_BRAND from '../../../graphql/mutations/brand/deleteBrand';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';

const styles = {
  media: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
};

const BrandList = ({
  classes, history, deleteBrand, addMsgFlash,
}) => (
  <Query query={GET_BRAND}>
    {({ data, loading }) => {
      if (loading) return <h1>Chargement...</h1>;
      return (
        <MaterialTable
          data={data.brands}
          title="Liste des marques"
          localization={localizationFr}
          columns={[
            { title: 'Libellé', field: 'name', defaultSort: 'desc' },
            {
              title: 'Image',
              field: 'image',
              sorting: false,
              searchable: false,
              render: (item) => (
                <>
                  <CardMedia
                    className={classes.media}
                    image={`http://localhost:4000/image/${item.filename}`}
                    title={item.name}
                  />
                </>
              ),
            },
          ]}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Modifier le produit',
              iconProps: {
                style: {
                  color: 'blue',
                },
              },
              onClick: (e, item) => {
                history.push({ pathname: '/admin/update-brand', brand: item });
              },
            },
            {
              icon: 'delete_forever',
              tooltip: 'Supprimer le produit',
              onClick: async (e, item) => {
                e.preventDefault();
                // eslint-disable-next-line no-alert
                if (window.confirm(`Êtes-vous sûr de vouloir supprimer ce produit (${item.name})?`)) {
                  await deleteBrand({
                    variables: {
                      id: item.id,
                    },
                  });

                  addMsgFlash({
                    variables: {
                      message: `"${item.name}" à été supprimé avec succès`,
                      type: 'success',
                      status: true,
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
      );
    }}
  </Query>
);


export default compose(
  graphql(DELETE_BRAND, {
    name: 'deleteBrand',
    options: {
      refetchQueries: [{ query: GET_BRAND }],
    },
  }),
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' })
)(withStyles(styles)(BrandList));
