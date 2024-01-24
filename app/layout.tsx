'use client'

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "./StoreProvider";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/Material/createEmotionCache"
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/Material/theme";



const emotionCache = createEmotionCache();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreProvider>
            <html lang="en" className={GeistSans.className}>
                <body className="bg-background text-foreground">
                    <main className="min-h-screen flex flex-col items-center">
                        <CacheProvider value={emotionCache}>
                            <ThemeProvider theme={theme}>
                                <Navbar />
                                {children}
                            </ThemeProvider>
                        </CacheProvider>
                    </main>
                </body>
            </html>
        </StoreProvider>
    );
}
