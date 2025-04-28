"use client"
import { createContext, useContext } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import CustomSnackbar from '@/components/ui/CustomSnackbar';

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
    const snackbarUtils = useSnackbar();
    
    return (
        <SnackbarContext.Provider value={snackbarUtils}>
            {children}
            <CustomSnackbar
                open={snackbarUtils.snackbar.open}
                message={snackbarUtils.snackbar.message}
                severity={snackbarUtils.snackbar.severity}
                onClose={snackbarUtils.hideSnackbar}
            />
        </SnackbarContext.Provider>
    );
};

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbarContext must be used within a SnackbarProvider');
    }
    return context;
}; 