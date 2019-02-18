import { fade } from '@material-ui/core/styles/colorManipulator';

export default (theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#1b1a20',
    position: 'sticky',
    top: 0,
    left: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  connexion: {
    fontSize: 18,
    margin: '20px 5px',
    textDecoration: 'none',
  },
  drawer: {
    backgroundColor: '',
    width: '30vw',
  },
  topBar: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
    alignItems: 'center',
    color: '#fff',
  },
  topBarInfo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '0 10px',
  },
  topBarBtn: {
    textDecoration: 'none',
    backgroundColor: '#e7c100',
    color: 'black',
    padding: 8,
    borderRadius: 5,
  },
  chip: {
    backgroundColor: '#e7c100',
  },
});
