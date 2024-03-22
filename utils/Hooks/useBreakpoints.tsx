import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

function useBreakpointDown(breakpointKey: 'sm' | 'md' | 'lg') {
    const theme = useTheme();
    const [isMatch, setIsMatch] = useState(false);

    useEffect(() => {
        const updateMatch = () => {
            console.log(theme.breakpoints.values)
            setIsMatch(window.innerWidth < theme.breakpoints.values[breakpointKey]);
        };

        // Initial check
        updateMatch();

        // Set up event listener
        window.addEventListener('resize', updateMatch);

        // Cleanup
        return () => window.removeEventListener('resize', updateMatch);
    }, [breakpointKey, theme]);

    return isMatch;
}

export default useBreakpointDown