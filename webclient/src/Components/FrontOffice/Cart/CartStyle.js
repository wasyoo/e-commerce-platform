export default {
  cartList: {
    width: '100%',
    height: '100%',
    border: '1px solid #000; border-width: 1px 0px 0px',
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #000; border-width: 0px 0px 1px',
    padding: 10,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      cursor: 'pointer',
    },
  },
  media: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  title: {
    fontWeight: '200',
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    textAlign: 'right',
  },
  listItemText: {
    padding: 0,
  },
  infoText: {
    textAlign: 'center',
    padding: 0,
  },
  itemText: {
    color: '#fff',
    textAlign: 'center',
  },
  itemTextSecodary: {
    color: '#fff',
    fontWeight: 300,
    fontSize: 10,
  },
  cartBtn: {
    color: '#fff',
    minWidth: 30,
    backgroundColor: '#eeeeee10',
    margin: '0 5px',
    '&:hover': {
      backgroundColor: 'rgba(231, 193, 0, 0.3);',
    },
  },
  cartHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  },
  iconShoppingCart: {
    fontSize: 40,
    color: '#fff',
  },
  totalQuantity: {
    width: 20,
    height: 20,
    fontWeight: 'bolder',
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: '#e8c000',
    position: 'relative',
    top: 10,
    right: 20,
  },
  cartContent: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1b1a20',
    marginBottom: 150,
  },
  cartFooter: {
    padding: 20,
    fontSize: 25,
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#000',
    textAlign: 'center',
  },
  sub: {
    color: '#5b5a5e',
    fontWeight: 600,
  },
  subPrice: {
    color: '#eabf00',
    fontWeight: 600,
  },
  emptyCart: {
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  cartFooterTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0 20px',
  },
  validateBtn: {
    color: '#fff',
    width: '80%',
    padding: '10px 30px',
    backgroundColor: '#1b1a20',
  },
  drawer: {
    width: '50vw',
    height: '100%',
    overflowY: 'scroll',
    backgroundColor: '#1b1a20',
    position: 'relative',
  },
  btnClose: {
    color: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
    background: '#000',
    zIndex: 1000,
    '& i': {
      fontSize: 40,
    },
    '& :hover': {
      color: 'red',
    },
  },
  '@media (max-width: 600px)': {
    drawer: {
      width: '100vw',
    },
  },
};
