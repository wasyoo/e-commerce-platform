export default {
  addShoppingCart: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    borderStyle: 'solid',
    borderRadius: '20px 0 0 0px',
    height: 60,
    width: 70,
    background: '#1b1a20',
    color: '#e8c000',
    transition: 'all .5s',
    '&:hover': {
      backgroundColor: '#e8c000',
      color: '#1b1a20',
    },
    '&:disabled': {
      backgroundColor: '#eee',
      color: '#00000075',
    },
  },
  card: {
    height: 500,
    position: 'relative',
    '& hover': {
      background: '#eee',
    },
  },
  media: {
    height: 350,
    display: 'flex',
    justifyContent: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  buttonDetail: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    justifyContent: 'flex-end',
    textDecoration: 'none',
  },
  infoTitle: {
    flex: 5,
  },
  infoPrice: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
