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
  },
  card: {
    maxWidth: 345,
    // border: '1px solid #1b1a20',
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
    alignItems: 'center',
  },
};
