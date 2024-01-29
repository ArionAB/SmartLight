'use client'

import dynamic from "next/dynamic"


const DynamicMapComponent = dynamic(() => import('@/components/Map/MapComponent'), { ssr: false })

export default async function Index() {




    return (
        <>
            <DynamicMapComponent />
        </>
    )

}
