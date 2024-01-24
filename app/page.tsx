'use client'

import { DrawerDialog } from "@/components/Drawer/DrawerDialog"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"


const DynamicMapComponent = dynamic(() => import('@/components/Map/MapComponent'), { ssr: false })

export default async function Index() {




    return (
        <Box>
            <DrawerDialog />
            <DynamicMapComponent />
        </Box>
    )

}
