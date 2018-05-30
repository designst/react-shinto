import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#c5cae9',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#bdbdbd',
      main: '#ff4081',
      dark: '#757575',
      contrastText: '#212121',
    },
  },
});

export default theme;
