'use client'

import dynamic from "next/dynamic"
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/Material/theme";
const DynamicMapComponent = dynamic(() => import('@/components/Map/MapComponent'), { ssr: false })

export default async function Index() {

    return (
        <>
            <ThemeProvider theme={theme}>
                <DynamicMapComponent />
            </ThemeProvider>
        </>
    )

}
