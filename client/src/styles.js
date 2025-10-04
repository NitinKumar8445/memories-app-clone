import { styled } from '@mui/material/styles';
import { AppBar, Container, Grid } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



export const StyledAppBar = styled(AppBar)({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});


export const Logo = styled('img')(({ theme }) => ({
  color: 'rgba(0,183,255, 1)',
  marginLeft: 15,
  width: '100%',
  maxWidth: 60,
  height: 'auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: 40,
  },
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row', // default on large screens
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse', // on small screens
  },
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row', // default on large screens
  justifyContent: 'space-between',
  alignItems: 'stretch',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse', // on small screens
  },
}));