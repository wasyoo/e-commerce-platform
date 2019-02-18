import React, { Component } from 'react';
import { Query, compose, graphql } from 'react-apollo';
import MaterialTable from 'material-table';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Avatar,
} from '@material-ui/core';
import { localizationFr } from '../../../Config/config';
import GET_ORDERS from '../../../graphql/queries/order/getOrders';
import DELETE_ORDER from '../../../graphql/mutations/order/deleteOrder';
import UPDATE_STATE from '../../../graphql/mutations/order/updateState';

class Order extends Component {
  changeState = (id, state) => {
    this.props.updateState({
      variables: {
        id,
        input: {
          state,
        },
      },
    });
  }

  render() {
    const { deleteOrder } = this.props;
    return (
      <Query query={GET_ORDERS}>
        {({ data, loading }) => {
          if (loading) return <h1>Chargement...</h1>;
          return (
            <MaterialTable
              data={data.orders}
              title="Liste des Commandes"
              localization={localizationFr}
              columns={[
                {
                  title: 'Commander par',
                  field: 'name',
                  render: ({ user }) => user && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: 10 }}>
                        {
                          user.avatar
                            ? <Avatar alt={user.firstName} src={user.avatar} />
                            : <Avatar>{user.firstName.slice(0, 1).toUpperCase()}</Avatar>
                        }
                      </div>
                      {`${user.firstName} ${user.lastName}`}
                    </div>
                  ),
                },
                {
                  title: 'Date',
                  field: 'date',
                  render: (item) => {
                    const date = new Date(item.createdAt * 1);
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const day = date.getDate();
                    return `${String(day).padStart(2, '0')} - ${String(month).padStart(2, '0')} - ${year}`;
                  },
                },
                {
                  title: 'Quantité',
                  field: 'quantity',
                  render: (item) => `${item.totalQuantity} article(s)`,
                },
                {
                  title: 'Total (dt)',
                  field: 'total',
                  render: (item) => item.totalPrice,
                },
                {
                  title: 'État',
                  field: 'status',
                  render: ({ state }) => {
                    switch (state) {
                      case 'waiting': return <span style={{ color: '#a5a541' }}>En attente</span>;
                      case 'completed': return <span style={{ color: 'green' }}>Achevée</span>;
                      case 'processing': return <span style={{ color: '#a5a541' }}>En Cours de traitement</span>;
                      default: return <span style={{ color: '#a5a541' }}>En attente</span>;
                    }
                  },
                },
              ]}
              actions={[
                {
                  icon: 'access_time',
                  tooltip: 'En cours de traitement',
                  iconProps: {
                    style: {
                      color: 'rgb(165, 165, 65)',
                    },
                  },
                  onClick: (e, { id }) => {
                    // eslint-disable-next-line no-alert
                    if (window.confirm('Êtes-vous sûr de vouloir changer l\'état de cette commande ?')) {
                      this.changeState(id, 'processing');
                    }
                  },
                },
                {
                  icon: 'done_outline',
                  tooltip: 'Achevée',
                  iconProps: {
                    style: {
                      color: 'green',
                    },
                  },
                  onClick: (e, { id }) => {
                    // eslint-disable-next-line no-alert
                    if (window.confirm('Êtes-vous sûr de vouloir changer l\'état de cette commande')) {
                      this.changeState(id, 'completed');
                    }
                  },
                },
                {
                  icon: 'delete_forever',
                  tooltip: 'Annuler la commande',
                  iconProps: {
                    style: {
                      color: 'red',
                    },
                  },
                  onClick: (e, { id }) => {
                    // eslint-disable-next-line no-alert
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
                      deleteOrder({
                        variables: {
                          id,
                        },
                      });
                    }
                  },
                },
              ]}
              options={{
                actionsColumnIndex: -1,
              }}
              detailPanel={[
                {
                  tooltip: 'Voir détails',
                  render: (product) => (
                    <div
                      style={{
                        fontSize: 100,
                        textAlign: 'center',
                        color: 'white',
                        backgroundColor: '#3EA07F',
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Article</TableCell>
                            <TableCell>Quantité</TableCell>
                            <TableCell>Prix</TableCell>
                            <TableCell>Montant</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {product.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                {item.product.name}
                              </TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.product.price}</TableCell>
                              <TableCell>{item.product.price * item.quantity}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell align="right"><strong>Montant Total</strong></TableCell>
                            <TableCell align="right"><strong>{product.totalPrice}</strong></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  ),
                },
              ]}
            />
          );
        }}
      </Query>
    );
  }
}
export default compose(
  graphql(DELETE_ORDER, {
    name: 'deleteOrder',
    options: {
      refetchQueries: [{ query: GET_ORDERS }],
    },
  }),
  graphql(UPDATE_STATE, {
    name: 'updateState',
    options: {
      refetchQueries: [{ query: GET_ORDERS }],
    },
  }),
)(Order);
