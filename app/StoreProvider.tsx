'use client'
import createEmotionCache from '@/utils/Material/createEmotionCache'
import { AppStore, makeStore } from '@/utils/Store/store'
import { CacheProvider } from '@emotion/react'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    // const emotionCache = createEmotionCache();
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>
        {/* <CacheProvider value={emotionCache}> */}
        {children}
        {/* </CacheProvider> */}
    </Provider>
}