"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import Sidebar from '@/components/admin/sidebar';
import { SnackbarProvider } from '@/contexts/SnackbarContext';
import { useLanguage } from '@/components/translation/translationLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

export default function AdminLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    const { locale } = useLanguage();

    const cacheRtl = createCache({
        key: locale === 'ar' ? 'muirtl' : 'muiltr',
        stylisPlugins: locale === 'ar' ? [prefixer, rtlPlugin] : [prefixer],
    });

    const rtlTheme = createTheme({
        direction: locale === 'en' ? 'ltr' : 'rtl',
    });

    useEffect(() => {
        const verifyAdmin = async () => {
            try {                
                const response = await fetch('/api/auth/verify-role', {
                    credentials: 'include',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Not authorized');
                }

                const data = await response.json();
                if (data.role !== 'admin') {
                    throw new Error('Not admin');
                }
                
                setIsAdmin(true);
                setIsLoading(false);
            } catch (error) {
                console.log('Admin verification error:', error);
                router.replace('/login');
            }
        };

        if (typeof window !== 'undefined') {
            verifyAdmin();
        }
    }, [router]);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
        }
    }, [locale]);

    if (isLoading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh' 
            }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <SnackbarProvider>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={rtlTheme}>
                    <div className={`admin-layout ${locale === 'en' ? 'ltr' : 'rtl'}`}>
                        <Sidebar children={children} />
                    </div>
                </ThemeProvider>
            </CacheProvider>
        </SnackbarProvider>
    );
}
