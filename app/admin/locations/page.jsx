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
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSnackbarContext } from '@/contexts/SnackbarContext';
import { FormattedMessage, useIntl } from 'react-intl';
import LoadingSkeleton from '../models/components/LoadingSkeleton';

const LocationsPage = () => {
    const [locations, setLocations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [formData, setFormData] = useState({
        name_en: '',
        name_ar: '',
        name_kr: ''
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [locationToDelete, setLocationToDelete] = useState(null);

    const { showSnackbar } = useSnackbarContext();
    const intl = useIntl();

    const fetchLocations = async () => {
        try {
            const locationsSnapshot = await getDocs(collection(db, 'locations'));
            const locationsData = locationsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLocations(locationsData);
        } catch (error) {
            console.error('Error fetching locations:', error);
            showSnackbar(intl.formatMessage({ id: 'error_fetching_locations' }), 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = (location = null) => {
        if (location) {
            setSelectedLocation(location);
            setFormData({
                name_en: location.name_en,
                name_ar: location.name_ar,
                name_kr: location.name_kr
            });
        } else {
            setSelectedLocation(null);
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
        setSelectedLocation(null);
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

            const locationData = {
                name_en: formData.name_en.trim(),
                name_ar: formData.name_ar.trim(),
                name_kr: formData.name_kr.trim(),
                updatedAt: new Date()
            };

            if (selectedLocation) {
                // Update existing location
                await updateDoc(doc(db, 'locations', selectedLocation.id), locationData);
                showSnackbar(intl.formatMessage({ id: 'location_updated' }), 'success');
            } else {
                // Create new location
                const newLocationRef = doc(collection(db, 'locations'));
                await setDoc(newLocationRef, {
                    ...locationData,
                    createdAt: new Date()
                });
                showSnackbar(intl.formatMessage({ id: 'location_added' }), 'success');
            }

            handleCloseModal();
            fetchLocations();
        } catch (error) {
            console.error('Error saving location:', error);
            showSnackbar(
                intl.formatMessage({ 
                    id: selectedLocation ? 'error_updating_location' : 'error_adding_location'
                }), 
                'error'
            );
        }
    };

    const handleDelete = async (location) => {
        setLocationToDelete(location);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteDoc(doc(db, 'locations', locationToDelete.id));
            showSnackbar(intl.formatMessage({ id: 'location_deleted' }), 'success');
            fetchLocations();
        } catch (error) {
            console.error('Error deleting location:', error);
            showSnackbar(intl.formatMessage({ id: 'error_deleting_location' }), 'error');
        } finally {
            setDeleteDialogOpen(false);
            setLocationToDelete(null);
        }
    };

    const filteredLocations = locations.filter(location => {
        const searchLower = searchQuery.toLowerCase();
        return location.name_en?.toLowerCase().includes(searchLower) ||
               location.name_ar?.toLowerCase().includes(searchLower) ||
               location.name_kr?.toLowerCase().includes(searchLower);
    });

    const displayedLocations = filteredLocations
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
                            <FormattedMessage id="locations_management" defaultMessage="Locations Management" />
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
                        <FormattedMessage id="add_new_location" defaultMessage="Add New Location" />
                    </Button>
                </div>
            </Paper>

            <Paper className="mb-4 p-3" sx={{ borderRadius: 3 }}>
                <div className="d-flex gap-3 align-items-center">
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={intl.formatMessage({ id: 'search_locations_placeholder', defaultMessage: 'Search locations...' })}
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
                                    <FormattedMessage id="location_name_en" defaultMessage="Location Name (English)" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="location_name_ar" defaultMessage="Location Name (Arabic)" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="location_name_kr" defaultMessage="Location Name (Kurdi)" />
                                </TableCell>
                                <TableCell align="right" sx={{ pr: 3 }}>
                                    <FormattedMessage id="actions" defaultMessage="Actions" />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedLocations.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            <FormattedMessage 
                                                id="no_locations_found" 
                                                defaultMessage={searchQuery ? "No locations found matching your search" : "No locations added yet"} 
                                            />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                displayedLocations.map((location) => (
                                    <TableRow 
                                        key={location.id} 
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
                                        <TableCell sx={{ py: 2 }}>{location.name_en}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{location.name_ar}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{location.name_kr}</TableCell>
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
                                                    onClick={() => handleOpenModal(location)}
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
                                                    onClick={() => handleDelete(location)}
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
                        count={filteredLocations.length}
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
                            id={selectedLocation ? "edit_location" : "add_new_location"}
                            defaultMessage={selectedLocation ? "Edit Location" : "Add New Location"}
                        />
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Stack spacing={2}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label={intl.formatMessage({ id: 'location_name_en', defaultMessage: 'Location Name (English)' })}
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
                            label={intl.formatMessage({ id: 'location_name_ar', defaultMessage: 'Location Name (Arabic)' })}
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
                            label={intl.formatMessage({ id: 'location_name_kr', defaultMessage: 'Location Name (Kurdi)' })}
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
                            id={selectedLocation ? "update" : "add"}
                            defaultMessage={selectedLocation ? "Update" : "Add"}
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
                            id="confirm_delete_location_message" 
                            defaultMessage="Are you sure you want to delete the location {location}? This action cannot be undone."
                            values={{
                                location: <strong>{locationToDelete ? (intl.locale === 'ar' ? locationToDelete.name_ar : intl.locale === 'en' ? locationToDelete.name_en : locationToDelete.name_kr) : ''}</strong>
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

export default LocationsPage; 