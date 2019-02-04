export default (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  companyInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  logo: {
    fontSize: 30,
  },
  document: {
    border: '1px solid black',
    padding: 50,
    width: 803,
    height: 1188,
  },
  buttonAction: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 80,
    right: 0,
  },
  printOrderSection: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'start',
  },
});
