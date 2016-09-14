import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const muiTheme = getMuiTheme({
  fontFamily: 'Ubuntu, san-serif',
  palette: {
    primary1Color: '#4877f9',
    accent1Color: '#4877f9',
  },
  tabs: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});

export const iMap = {
  appBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '20px',
  },
  appBarIconButton: {
    position: 'relative',
  },
  selectBoxWithSearch: {
    width: '256px',
    position: 'absolute',
    zIndex: '1200',
    top: '50px',
    left: '5px',
    background: 'white',
  },
};
