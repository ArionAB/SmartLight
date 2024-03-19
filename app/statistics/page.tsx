'use client'

import ProjectTab from "@/components/Statistics/ProjectTab";
import StreetTab from "@/components/Statistics/StreetTab";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


const Statistics = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Box sx={{ width: '100%', height: 'calc(100dvh - 124px)' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Proiecte" />
                    <Tab label="Străzi" />
                    {/* <Tab label="Item Three" /> */}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ProjectTab />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <StreetTab />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel> */}
        </Box>

    )
}

export default Statistics