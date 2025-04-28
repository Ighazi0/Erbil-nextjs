'use client';
import { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    TextField,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSnackbarContext } from '@/contexts/SnackbarContext';
import { FormattedMessage, useIntl } from 'react-intl';
import LoadingSkeleton from '../models/components/LoadingSkeleton';

const BrandsPage = () => {
    const [brands, setBrands] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [formData, setFormData] = useState({
        name_en: '',
        name_ar: '',
        name_kr: ''
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);

    const { showSnackbar } = useSnackbarContext();
    const intl = useIntl();

    const fetchBrands = async () => {
        try {
            const brandsSnapshot = await getDocs(collection(db, 'brands'));
            const brandsData = brandsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBrands(brandsData);
        } catch (error) {
            console.error('Error fetching brands:', error);
            showSnackbar(intl.formatMessage({ id: 'error_fetching_brands' }), 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = (brand = null) => {
        if (brand) {
            setSelectedBrand(brand);
            setFormData({
                name_en: brand.name_en,
                name_ar: brand.name_ar,
                name_kr: brand.name_kr
            });
        } else {
            setSelectedBrand(null);
            setFormData({
                name_en: '',
                name_ar: '',
                name_kr: ''
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedBrand(null);
        setFormData({
            name_en: '',
            name_ar: '',
            name_kr: ''
        });
    };

    const handleSubmit = async () => {
        try {
            if (!formData.name_en.trim() || !formData.name_ar.trim() || !formData.name_kr.trim()) {
                showSnackbar(intl.formatMessage({ id: 'fill_all_fields' }), 'error');
                return;
            }

            const brandData = {
                name_en: formData.name_en.trim(),
                name_ar: formData.name_ar.trim(),
                name_kr: formData.name_kr.trim(),
                updatedAt: new Date()
            };

            if (selectedBrand) {
                // Update existing brand
                await updateDoc(doc(db, 'brands', selectedBrand.id), brandData);
                showSnackbar(intl.formatMessage({ id: 'brand_updated' }), 'success');
            } else {
                // Create new brand
                const newBrandRef = doc(collection(db, 'brands'));
                await setDoc(newBrandRef, {
                    ...brandData,
                    createdAt: new Date()
                });
                showSnackbar(intl.formatMessage({ id: 'brand_added' }), 'success');
            }

            handleCloseModal();
            fetchBrands();
        } catch (error) {
            console.error('Error saving brand:', error);
            showSnackbar(
                intl.formatMessage({ 
                    id: selectedBrand ? 'error_updating_brand' : 'error_adding_brand'
                }), 
                'error'
            );
        }
    };

    const handleDelete = async (brand) => {
        setBrandToDelete(brand);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteDoc(doc(db, 'brands', brandToDelete.id));
            showSnackbar(intl.formatMessage({ id: 'brand_deleted' }), 'success');
            fetchBrands();
        } catch (error) {
            console.error('Error deleting brand:', error);
            showSnackbar(intl.formatMessage({ id: 'error_deleting_brand' }), 'error');
        } finally {
            setDeleteDialogOpen(false);
            setBrandToDelete(null);
        }
    };

    const filteredBrands = brands.filter(brand => {
        const searchLower = searchQuery.toLowerCase();
        return brand.name_en?.toLowerCase().includes(searchLower) ||
               brand.name_ar?.toLowerCase().includes(searchLower) ||
               brand.name_kr?.toLowerCase().includes(searchLower);
    });

    const displayedBrands = filteredBrands
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <Box className="p-3 p-md-4 w-100 min-vh-100 bg-light">
            <Paper className="mb-4 p-4 bg-white shadow" sx={{ borderRadius: 3 }}>
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
                    <div>
                        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
                            <FormattedMessage id="brands_management" defaultMessage="Brands Management" />
                        </Typography>
                    </div>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenModal()}
                        size="large"
                        sx={{ 
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            boxShadow: 2
                        }}
                    >
                        <FormattedMessage id="add_new_brand" defaultMessage="Add New Brand" />
                    </Button>
                </div>
            </Paper>

            <Paper className="mb-4 p-3" sx={{ borderRadius: 3 }}>
                <div className="d-flex gap-3 align-items-center">
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={intl.formatMessage({ id: 'search_brands_placeholder', defaultMessage: 'Search brands...' })}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                        }}
                        sx={{ 
                            minWidth: '250px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#fff',
                                '&:hover': {
                                    '& > fieldset': {
                                        borderColor: 'primary.main',
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </Paper>

            <Paper sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 2
            }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ 
                                backgroundColor: '#f8f9fa',
                                '& th': { 
                                    fontWeight: 600,
                                    color: '#1976d2',
                                    fontSize: '0.95rem',
                                    py: 2
                                }
                            }}>
                                <TableCell>
                                    <FormattedMessage id="brand_name_en" defaultMessage="Brand Name (English)" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="brand_name_ar" defaultMessage="Brand Name (Arabic)" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="brand_name_kr" defaultMessage="Brand Name (Kurdi)" />
                                </TableCell>
                                <TableCell align="right" sx={{ pr: 3 }}>
                                    <FormattedMessage id="actions" defaultMessage="Actions" />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedBrands.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            <FormattedMessage 
                                                id="no_brands_found" 
                                                defaultMessage={searchQuery ? "No brands found matching your search" : "No brands added yet"} 
                                            />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                displayedBrands.map((brand) => (
                                    <TableRow 
                                        key={brand.id} 
                                        hover
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f8f9fa',
                                                '& .action-buttons': {
                                                    opacity: 1
                                                }
                                            },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <TableCell sx={{ py: 2 }}>{brand.name_en}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{brand.name_ar}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{brand.name_kr}</TableCell>
                                        <TableCell align="right">
                                            <Box 
                                                className="action-buttons"
                                                sx={{ 
                                                    opacity: 0.6,
                                                    transition: 'opacity 0.2s',
                                                    pr: 1
                                                }}
                                            >
                                                <IconButton 
                                                    onClick={() => handleOpenModal(brand)}
                                                    color="primary"
                                                    size="small"
                                                    sx={{ 
                                                        mr: 1,
                                                        '&:hover': {
                                                            backgroundColor: 'primary.lighter'
                                                        }
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton 
                                                    onClick={() => handleDelete(brand)}
                                                    color="error"
                                                    size="small"
                                                    sx={{ 
                                                        '&:hover': {
                                                            backgroundColor: 'error.lighter'
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ 
                    borderTop: '1px solid #eee',
                    backgroundColor: '#fff'
                }}>
                    <TablePagination
                        component="div"
                        count={filteredBrands.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        sx={{
                            '.MuiTablePagination-select': {
                                borderRadius: 2,
                            }
                        }}
                    />
                </Box>
            </Paper>

            <Dialog 
                open={openModal} 
                onClose={handleCloseModal}
                PaperProps={{
                    sx: { 
                        borderRadius: 3,
                        boxShadow: 3
                    }
                }}
            >
                <DialogTitle 
                    sx={{ 
                        borderBottom: '1px solid #eee', 
                        pb: 2,
                        backgroundColor: '#f8f9fa'
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
                        <FormattedMessage 
                            id={selectedBrand ? "edit_brand" : "add_new_brand"}
                            defaultMessage={selectedBrand ? "Edit Brand" : "Add New Brand"}
                        />
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Stack spacing={2}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label={intl.formatMessage({ id: 'brand_name_en', defaultMessage: 'Brand Name (English)' })}
                            fullWidth
                            value={formData.name_en}
                            onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { 
                                    borderRadius: 2,
                                    '&:hover': {
                                        '& > fieldset': {
                                            borderColor: 'primary.main',
                                        }
                                    }
                                }
                            }}
                        />
                        <TextField
                            margin="dense"
                            label={intl.formatMessage({ id: 'brand_name_ar', defaultMessage: 'Brand Name (Arabic)' })}
                            fullWidth
                            value={formData.name_ar}
                            onChange={(e) => setFormData(prev => ({ ...prev, name_ar: e.target.value }))}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { 
                                    borderRadius: 2,
                                    '&:hover': {
                                        '& > fieldset': {
                                            borderColor: 'primary.main',
                                        }
                                    }
                                }
                            }}
                            dir="rtl"
                        />
                        <TextField
                            margin="dense"
                            label={intl.formatMessage({ id: 'brand_name_kr', defaultMessage: 'Brand Name (Arabic)' })}
                            fullWidth
                            value={formData.name_kr}
                            onChange={(e) => setFormData(prev => ({ ...prev, name_kr: e.target.value }))}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover': {
                                        '& > fieldset': {
                                            borderColor: 'primary.main',
                                        }
                                    }
                                }
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2.5, pt: 1.5, backgroundColor: '#f8f9fa' }}>
                    <Button 
                        onClick={handleCloseModal}
                        color="inherit"
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Button 
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3,
                            boxShadow: 2
                        }}
                    >
                        <FormattedMessage 
                            id={selectedBrand ? "update" : "add"}
                            defaultMessage={selectedBrand ? "Update" : "Add"}
                        />
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{
                    sx: { 
                        borderRadius: 3,
                        boxShadow: 3,
                        maxWidth: '400px'
                    }
                }}
            >
                <DialogTitle 
                    sx={{ 
                        pb: 2,
                        backgroundColor: '#f8f9fa',
                        color: 'error.main'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DeleteIcon color="error" />
                        <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                            <FormattedMessage id="confirm_delete" defaultMessage="Confirm Delete" />
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Typography>
                        <FormattedMessage 
                            id="confirm_delete_brand_message" 
                            defaultMessage="Are you sure you want to delete the brand {brand}? This action cannot be undone."
                            values={{
                                brand: <strong>{brandToDelete ? (intl.locale === 'ar' ? brandToDelete.name_ar : intl.locale === 'en' ? brandToDelete.name_en : brandToDelete.name_kr) : ''}</strong>
                            }}
                        />
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2.5, pt: 1.5, backgroundColor: '#f8f9fa' }}>
                    <Button 
                        onClick={() => setDeleteDialogOpen(false)}
                        color="inherit"
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Button 
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3,
                            boxShadow: 2
                        }}
                    >
                        <FormattedMessage id="delete" defaultMessage="Delete" />
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BrandsPage; 