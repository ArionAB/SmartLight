import { useTheme } from '@mui/material/styles';

const useThemeHook = (path: any) => {
    const theme = useTheme();
    const parts = ['palette'].concat(path?.split('.'));
    return parts?.reduce((acc: any, curr) => acc[curr], theme);
};

export default useThemeHook;