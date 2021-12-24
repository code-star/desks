import {createTheme } from '@mui/material/styles';
import { orange, deepOrange } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: deepOrange[500],
      },
    },
  });