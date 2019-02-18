import React from 'react';
import { Query, compose, graphql } from 'react-apollo';
import {
  withStyles, SnackbarContent, IconButton, Snackbar,
} from '@material-ui/core';
import GET_FLASH_MSG from '../../../graphql/Client/queries/flashMsg/getFlashMsg';
import ADD_MSG_FLASH from '../../../graphql/Client/mutations/flashMsg/addFlashMsg';
import styles from './FlashMsgStyle';

function MySnackbarContent({
  classes, message, onClose, type,
}) {
  return (
    <SnackbarContent
      aria-describedby="client-snackbar"
      className={classes[type]}
      message={(
        <span id="message-id" className={classes.message}>
          <i className="material-icons">
            info
          </i>
          {message}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <i className="material-icons">
            close
          </i>
        </IconButton>,
      ]}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

const FlashMsg = ({ addMsgFlash }) => (
  <Query query={GET_FLASH_MSG}>
    {
      ({ data }) => {
        if (data.flashMsg) {
          return (
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              open={data.flashMsg.status}
              onClose={() => {
                addMsgFlash({
                  variables: {
                    message: '',
                    type: null,
                    status: false,
                  },
                });
              }}
            >
              <MySnackbarContentWrapper
                message={data.flashMsg.message}
                type={data.flashMsg.type}
                onClose={() => {
                  addMsgFlash({
                    variables: {
                      message: null,
                      type: null,
                      status: false,
                    },
                  });
                }}
              />
            </Snackbar>
          );
        }
        return null;
      }
    }
  </Query>
);

export default compose(
  graphql(ADD_MSG_FLASH, { name: 'addMsgFlash' })
)(withStyles(styles)(FlashMsg));
