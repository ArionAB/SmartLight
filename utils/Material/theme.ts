import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


const theme = createTheme({
    palette: {
        primary: {
            main: '#004aad',
            light: '#0c5eb4',
            '400': '#0052cc'

        },
        secondary: {
            main: '#19857b',
            light: "#fffcf7"
        },
        error: {
            main: red.A400,
        },
        success: {
            main: '#00897b'
        },
        common: {
            white: '#fffcf7'
        },


    },
});

export default theme;