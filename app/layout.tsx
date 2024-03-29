
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import StoreProvider from "./StoreProvider";
import AppSnackbar from "@/components/Notifications/Notifications";
import { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import BottomTabs from "@/components/Drawer/BottomTabs";


export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: "Illumitech Solution"
}

function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreProvider>
            <html lang="en" className={GeistSans.className}>
                <body className="bg-background text-foreground">
                    <AppRouterCacheProvider>
                        <main className="min-h-screen flex flex-col items-center">
                            <AppSnackbar />
                            <Navbar />
                            {children}
                            <BottomTabs />
                        </main>
                    </AppRouterCacheProvider>
                </body>
            </html>
        </StoreProvider>
    );
}

export default RootLayout