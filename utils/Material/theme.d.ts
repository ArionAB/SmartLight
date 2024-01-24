import { Theme, ThemeOptions, Palette } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface CustomTheme extends Omit<Theme, 'palette'> {
        palette: Palette & {
            primary: Palette['primary'] & {
                main: string;
                light: string;
                background: string;
            };
            secondary: Palette['secondary'] & {
                main: string;
            };
            error: Palette['error'];
        };
    }

    interface CustomThemeOptions extends Omit<ThemeOptions, 'palette'> {
        palette?: Partial<CustomTheme['palette']>;
    }

    export function createTheme(options?: CustomThemeOptions): CustomTheme;
}