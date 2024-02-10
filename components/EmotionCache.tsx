'use client'
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/Material/createEmotionCache";


const EmotionCache = () => {
    const emotionCache = createEmotionCache();

    return (
        <CacheProvider value={emotionCache}>
        </CacheProvider>
    )
}

export default EmotionCache

