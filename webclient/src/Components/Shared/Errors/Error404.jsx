import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Error404 = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: '60vh',
    }}
  >
    <h1>:( 404 - PAGE NON TROUVÉE</h1>
    <Link to="/">
      <Button variant="contained" color="primary">
        Accueil
      </Button>
    </Link>
  </div>
);

export default Error404;
