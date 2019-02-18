import React from 'react';
import { Query, compose, graphql } from 'react-apollo';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import { localizationFr } from '../../../Config/config';
import GET_USERS from '../../../graphql/queries/user/getUsers';
import DELETE_USER from '../../../graphql/mutations/user/deleteUser';

const Client = ({ deleteUser }) => (
  <Query query={GET_USERS}>
    {({ data, loading }) => {
      if (loading) return <h1>Chargement...</h1>;
      return (
        <MaterialTable
          data={data.users}
          title="Liste des Clients"
          localization={localizationFr}
          columns={[
            {
              title: 'Nom',
              field: 'name',
              render: ({ firstName, lastName, avatar }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: 10 }}>
                    {
                      avatar
                        ? <Avatar alt={firstName} src={avatar} />
                        : <Avatar>{firstName.slice(0, 1).toUpperCase()}</Avatar>
                    }
                  </div>
                  {`${firstName} ${lastName}`}
                </div>
              ),
            },
            {
              title: 'Email',
              field: 'email',
            },
            {
              title: 'N° Tel',
              field: 'Phone',
            },
            {
              title: 'Adresse',
              field: 'address',
            },
            {
              title: 'Commandes',
              field: 'order',
              render: ({ order }) => order.length,
            },
          ]}
          actions={[
            {
              icon: 'delete_forever',
              tooltip: 'Supprimer le client',
              iconProps: {
                style: {
                  color: 'red',
                },
              },
              onClick: (e, item) => {
                // eslint-disable-next-line no-alert
                if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
                  deleteUser({
                    variables: {
                      id: item.id,
                    },
                  });
                }
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
  graphql(DELETE_USER, {
    name: 'deleteUser',
    options: {
      refetchQueries: [{ query: GET_USERS }],
    },
  })
)(Client);
