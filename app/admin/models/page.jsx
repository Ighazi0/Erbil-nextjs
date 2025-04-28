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
    Autocomplete,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSnackbarContext } from '@/contexts/SnackbarContext';
import { FormattedMessage, useIntl } from 'react-intl';
import LoadingSkeleton from './components/LoadingSkeleton';

const ModelsPage = () => {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);
    const [formData, setFormData] = useState({
        name_en: '',
        name_ar: '',
        name_kr: '',
        brand: null
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [modelToDelete, setModelToDelete] = useState(null);

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
        }
    };

    const fetchModels = async () => {
        try {
            const modelsSnapshot = await getDocs(collection(db, 'models'));
            const modelsPromises = modelsSnapshot.docs.map(async modelDoc => {
                const modelData = modelDoc.data();
                let brandData = null;
                
                if (modelData.brand) {
                    const brandDoc = await getDoc(modelData.brand);
                    if (brandDoc.exists()) {
                        brandData = {
                            id: brandDoc.id,
                            ...brandDoc.data()
                        };
                    }
                }

                return {
                    id: modelDoc.id,
                    ...modelData,
                    brand: brandData
                };
            });

            const modelsData = await Promise.all(modelsPromises);
            setModels(modelsData);
        } catch (error) {
            console.error('Error fetching models:', error);
            showSnackbar(intl.formatMessage({ id: 'error_fetching_models' }), 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        Promise.all([fetchBrands(), fetchModels()]);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = (model = null) => {
        if (model) {
            setSelectedModel(model);
            setFormData({
                name_en: model.name_en,
                name_ar: model.name_ar,
                name_kr: model.name_kr,
                brand: model.brand
            });
        } else {
            setSelectedModel(null);
            setFormData({
                name_en: '',
                name_ar: '',
                name_kr: '',
                brand: null
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedModel(null);
        setFormData({
            name_en: '',
            name_ar: '',
            name_kr: '',
            brand: null
        });
    };

    const handleSubmit = async () => {
        try {
            if (!formData.name_kr.trim() || !formData.name_en.trim() || !formData.name_ar.trim() || !formData.brand) {
                showSnackbar(intl.formatMessage({ id: 'fill_all_fields' }), 'error');
                return;
            }

            const modelData = {
                name_en: formData.name_en.trim(),
                name_ar: formData.name_ar.trim(),
                name_kr: formData.name_kr.trim(),
                brand: doc(db, 'brands', formData.brand.id),
                updatedAt: new Date()
            };

            if (selectedModel) {
                // Update existing model
                await updateDoc(doc(db, 'models', selectedModel.id), modelData);
                showSnackbar(intl.formatMessage({ id: 'model_updated' }), 'success');
            } else {
                // Create new model
                const newModelRef = doc(collection(db, 'models'));
                await setDoc(newModelRef, {
                    ...modelData,
                    createdAt: new Date()
                });
                showSnackbar(intl.formatMessage({ id: 'model_added' }), 'success');
            }

            handleCloseModal();
            fetchModels();
        } catch (error) {
            console.error('Error saving model:', error);
            showSnackbar(
                intl.formatMessage({ 
                    id: selectedModel ? 'error_updating_model' : 'error_adding_model'
                }), 
                'error'
            );
        }
    };

    const handleDelete = async (model) => {
        setModelToDelete(model);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteDoc(doc(db, 'models', modelToDelete.id));
            showSnackbar(intl.formatMessage({ id: 'model_deleted' }), 'success');
            fetchModels();
        } catch (error) {
            console.error('Error deleting model:', error);
            showSnackbar(intl.formatMessage({ id: 'error_deleting_model' }), 'error');
        } finally {
            setDeleteDialogOpen(false);
            setModelToDelete(null);
        }
    };

    const filteredModels = models.filter(model => {
        const searchLower = searchQuery.toLowerCase();
        return model.name_en?.toLowerCase().includes(searchLower) ||
               model.name_ar?.toLowerCase().includes(searchLower) ||
               model.name_kr?.toLowerCase().includes(searchLower) ||
               model.brand?.name_en?.toLowerCase().includes(searchLower) ||
               model.brand?.name_ar?.toLowerCase().includes(searchLower) ||
               model.brand?.name_kr?.toLowerCase().includes(searchLower);
    });

    const displayedModels = filteredModels
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
                            <FormattedMessage id="models_management" defaultMessage="Models Management" />
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
                        <FormattedMessage id="add_new_model" defaultMessage="Add New Model" />
                    </Button>
                </div>
            </Paper>

            <Paper className="mb-4 p-3" sx={{ borderRadius: 3 }}>
                <div className="d-flex gap-3 align-items-center">
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={intl.formatMessage({ id: 'search_models_placeholder', defaultMessage: 'Search models...' })}
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
                                    <FormattedMessage id="model_name_en" defaultMessage="Model Name (English)" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="model_name_ar" defaultMessage="Model Name (Arabic)" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="model_name_kr" defaultMessage="Model Name (Kurdi)" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="brand" defaultMessage="Brand" />
                                </TableCell>
                                <TableCell align="right" sx={{ pr: 3 }}>
                                    <FormattedMessage id="actions" defaultMessage="Actions" />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedModels.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            <FormattedMessage 
                                                id="no_models_found" 
                                                defaultMessage={searchQuery ? "No models found matching your search" : "No models added yet"} 
                                            />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                displayedModels.map((model) => (
                                    <TableRow 
                                        key={model.id} 
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
                                        <TableCell sx={{ py: 2 }}>{model.name_en}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{model.name_ar}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{model.name_kr}</TableCell>
                                        <TableCell sx={{ py: 2 }}>
                                            {intl.locale === 'ar' ? model.brand?.name_ar : intl.locale === 'en' ? model.brand?.name_en : model.brand?.name_kr}
                                        </TableCell>
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
                                                    onClick={() => handleOpenModal(model)}
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
                                                    onClick={() => handleDelete(model)}
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
                        count={filteredModels.length}
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
                            id={selectedModel ? "edit_model" : "add_new_model"}
                            defaultMessage={selectedModel ? "Edit Model" : "Add New Model"}
                        />
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Stack spacing={2}>
                        <Autocomplete
                            value={formData.brand}
                            onChange={(_, newValue) => setFormData(prev => ({ ...prev, brand: newValue }))}
                            options={brands}
                            getOptionLabel={(option) => intl.locale === 'ar' ? option?.name_ar : intl.locale === 'en' ? option?.name_en : option?.name_kr}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={intl.formatMessage({ id: 'brand', defaultMessage: 'Brand' })}
                                    required
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
                            )}
                            renderOption={(props, option) => (
                                <li {...props}>
                                    {intl.locale === 'ar' ? option.name_ar : intl.locale === 'en' ? option.name_en : option.name_kr}
                                </li>
                            )}
                            isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label={intl.formatMessage({ id: 'model_name_en', defaultMessage: 'Model Name (English)' })}
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
                            label={intl.formatMessage({ id: 'model_name_ar', defaultMessage: 'Model Name (Arabic)' })}
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
                            label={intl.formatMessage({ id: 'model_name_kr', defaultMessage: 'Model Name (Kurdi)' })}
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
                            id={selectedModel ? "update" : "add"}
                            defaultMessage={selectedModel ? "Update" : "Add"}
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
                            id="confirm_delete_model_message" 
                            defaultMessage="Are you sure you want to delete the model {model}? This action cannot be undone."
                            values={{
                                model: <strong>{modelToDelete ? (intl.locale === 'ar' ? modelToDelete.name_ar : intl.locale === 'en' ? modelToDelete.name_en : modelToDelete.name_kr) : ''}</strong>
                            }}
                        />
                    </Typography>
                    {modelToDelete?.brand && (
                        <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                            <FormattedMessage 
                                id="model_brand_info" 
                                defaultMessage="Brand: {brand}"
                                values={{
                                    brand: intl.locale === 'ar' ? modelToDelete.brand.name_ar : intl.locale === 'en' ? modelToDelete.brand.name_en : modelToDelete.brand.name_kr
                                }}
                            />
                        </Typography>
                    )}
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

export default ModelsPage; 