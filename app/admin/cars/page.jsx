'use client';
import { useState, useEffect, useMemo, memo } from 'react';
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
    Chip,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Skeleton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSnackbarContext } from '@/contexts/SnackbarContext';
import { FormattedMessage, useIntl } from 'react-intl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';

const CarsPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showSnackbar } = useSnackbarContext();
    const intl = useIntl();
    const [carToDelete, setCarToDelete] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const carsCollection = collection(db, 'cars');
            const carsSnapshot = await getDocs(carsCollection);
            const carsData = await Promise.all(carsSnapshot.docs.map(async (doc) => {
                const data = doc.data();
                const createdAt = data.createdAt?.toDate?.()?.toISOString() || '';
                const updatedAt = data.updatedAt?.toDate?.()?.toISOString() || '';

                // Fetch references
                const [typeDoc, locationDoc, brandDoc, modelDoc] = await Promise.all([
                    data.type ? getDoc(data.type) : null,
                    data.location ? getDoc(data.location) : null,
                    data.brand ? getDoc(data.brand) : null,
                    data.model ? getDoc(data.model) : null
                ]);

                return {
                    id: doc.id,
                    name: data.name || '',
                    brand: brandDoc?.data()?.name_en || '',
                    model: modelDoc?.data()?.name_en || '',
                    type: typeDoc?.data()?.name_en || '',
                    location: locationDoc?.data()?.name_en || '',
                    transmission: data.transmission || '',
                    price: typeof data.price === 'number' ? Number(data.price) : 0,
                    status: data.status || 'unavailable',
                    condition: data.condition || '',
                    year: data.year || '',
                    color: data.color || '',
                    mileage: data.mileage || '',
                    createdAt,
                    updatedAt,
                    imageUrl: data.imageUrl || '',
                };
            }));
            setCars(carsData);
        } catch (error) {
            console.error('Error fetching cars:', error);
            showSnackbar(intl.formatMessage({ id: 'error_fetching_cars' }), 'error');
        } finally {
            setLoading(false);
        }
    };
    

    const handleDelete = async (car) => {
        setCarToDelete(car);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteDoc(doc(db, 'cars', carToDelete.id));
            showSnackbar(intl.formatMessage({ id: 'car_deleted_success' }), 'success');
            fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
            showSnackbar(intl.formatMessage({ id: 'error_deleting_car' }), 'error');
        } finally {
            setDeleteDialogOpen(false);
            setCarToDelete(null);
        }
    };

    const filteredCars = useMemo(() => {
        return cars.filter(car => {
            const searchTerm = (searchQuery || '').toLowerCase();

            const carName = String(car?.name ?? '').toLowerCase();
            const carModel = String(car?.model ?? '').toLowerCase();
            const carType = String(car?.type ?? '').toLowerCase();
            const carStatus = String(car?.status ?? '').toLowerCase();

            const typeFilterLower = (typeFilter || '').toLowerCase();
            const statusFilterLower = (statusFilter || '').toLowerCase();

            const matchesSearch = !searchTerm ||
                carName.includes(searchTerm) ||
                carModel.includes(searchTerm);

            const matchesType = !typeFilterLower ||
                carType === typeFilterLower;

            const matchesStatus = !statusFilterLower ||
                carStatus === statusFilterLower;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [cars, searchQuery, typeFilter, statusFilter]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleError = (error) => {
        console.error('Error in CarsPage:', error);
        showSnackbar(intl.formatMessage({ id: 'unexpected_error' }), 'error');
    };

    useEffect(() => {
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (loading) {
        return (
            <Box className="p-3 p-md-4 w-100 min-vh-100 bg-light">
                <Paper className="mb-4 p-4 bg-white shadow">
                    <div className="d-flex justify-content-between align-items-center">
                        <Skeleton variant="rectangular" width={200} height={32} />
                        <Skeleton variant="rectangular" width={120} height={40} />
                    </div>
                </Paper>

                <Paper className="mb-4 p-3">
                    <div className="d-flex gap-3">
                        <Skeleton variant="rectangular" width={250} height={40} />
                        <Skeleton variant="rectangular" width={150} height={40} />
                        <Skeleton variant="rectangular" width={150} height={40} />
                    </div>
                </Paper>

                <Paper className="w-100 overflow-hidden shadow">
                    <TableContainer>
                        <Table>
                            <TableHead className="bg-light">
                                <TableRow>
                                    {[...Array(7)].map((_, index) => (
                                        <TableCell key={index}>
                                            <Skeleton variant="text" width={80} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[...Array(5)].map((_, index) => (
                                    <TableRow key={index}>
                                        {[...Array(7)].map((_, cellIndex) => (
                                            <TableCell key={cellIndex}>
                                                <Skeleton variant="text" width={cellIndex === 6 ? 100 : 80} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        );
    }

    return (
        <Box className="p-3 p-md-4 w-100 min-vh-100 bg-light">
            <Paper className="mb-4 p-4 bg-white shadow" sx={{ borderRadius: 3 }}>
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                    <div>
                        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                            <FormattedMessage id="cars_management" defaultMessage="Cars Management" />
                        </Typography>
                    </div>
                    <Link href="/admin/cars/form" passHref>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            size="large"
                            sx={{ 
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                boxShadow: 2
                            }}
                        >
                            <FormattedMessage id="add_new_car" defaultMessage="Add New Car" />
                        </Button>
                    </Link>
                </div>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TuneIcon fontSize="small" />
                        <FormattedMessage id="search_and_filters" defaultMessage="Search & Filters" />
                    </Typography>
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 2,
                        alignItems: 'flex-start'
                    }}>
                        <TextField
                            size="small"
                            placeholder={intl.formatMessage({ id: 'search_cars_placeholder', defaultMessage: 'Search by name or model...' })}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                minWidth: { xs: '100%', sm: '300px' },
                                flex: { sm: 1 },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#fff',
                                    '&:hover': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'primary.main',
                                        }
                                    }
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon sx={{ 
                                        color: 'text.secondary', 
                                        mr: 1 
                                    }} />
                                ),
                                sx: { 
                                    borderRadius: 2,
                                    '&:hover': {
                                        '& .MuiSvgIcon-root': {
                                            color: 'primary.main'
                                        }
                                    }
                                }
                            }}
                        />
                        <Box sx={{ 
                            display: 'flex', 
                            gap: 2,
                            flexWrap: 'wrap',
                            alignItems: 'center'
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: 2,
                                backgroundColor: '#fff',
                                p: 0.5,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}>
                                <FilterAltIcon sx={{ ml: 1, color: 'text.secondary' }} />
                                <FormControl 
                                    size="small" 
                                    sx={{ 
                                        minWidth: '150px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none'
                                        }
                                    }}
                                >
                                    <InputLabel>
                                        <FormattedMessage id="type" defaultMessage="Type" />
                                    </InputLabel>
                                    <Select
                                        value={typeFilter}
                                        label={<FormattedMessage id="type" defaultMessage="Type" />}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <FormattedMessage id="all_types" defaultMessage="All Types" />
                                        </MenuItem>
                                        <MenuItem value="sedan">
                                            <FormattedMessage id="sedan" defaultMessage="Sedan" />
                                        </MenuItem>
                                        <MenuItem value="suv">
                                            <FormattedMessage id="suv" defaultMessage="SUV" />
                                        </MenuItem>
                                        <MenuItem value="sports">
                                            <FormattedMessage id="sports" defaultMessage="Sports" />
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl 
                                    size="small" 
                                    sx={{ 
                                        minWidth: '150px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none'
                                        }
                                    }}
                                >
                                    <InputLabel>
                                        <FormattedMessage id="status" defaultMessage="Status" />
                                    </InputLabel>
                                    <Select
                                        value={statusFilter}
                                        label={<FormattedMessage id="status" defaultMessage="Status" />}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <FormattedMessage id="all_status" defaultMessage="All Status" />
                                        </MenuItem>
                                        <MenuItem value="available">
                                            <FormattedMessage id="available" defaultMessage="Available" />
                                        </MenuItem>
                                        <MenuItem value="reserved">
                                            <FormattedMessage id="reserved" defaultMessage="Reserved" />
                                        </MenuItem>
                                        <MenuItem value="maintenance">
                                            <FormattedMessage id="maintenance" defaultMessage="Maintenance" />
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            {(searchQuery || typeFilter || statusFilter) && (
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setTypeFilter('');
                                        setStatusFilter('');
                                    }}
                                    sx={{ 
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        borderColor: 'divider',
                                        color: 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: 'error.lighter',
                                            borderColor: 'error.light',
                                            color: 'error.main'
                                        }
                                    }}
                                >
                                    <FormattedMessage id="clear_filters" defaultMessage="Clear Filters" />
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Paper>

            <Paper className="overflow-hidden" sx={{ 
                borderRadius: 3,
                boxShadow: 2,
                '& .MuiTableCell-root': {
                    borderColor: '#f0f0f0',
                    fontSize: '0.875rem'
                }
            }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ 
                                backgroundColor: '#f8f9fa',
                                '& th': { 
                                    fontWeight: 600,
                                    color: '#1976d2',
                                    borderBottom: '2px solid #e0e0e0',
                                    whiteSpace: 'nowrap'
                                }
                            }}>
                                <TableCell><FormattedMessage id="car_name" /></TableCell>
                                <TableCell><FormattedMessage id="brand" /></TableCell>
                                <TableCell><FormattedMessage id="model" /></TableCell>
                                <TableCell><FormattedMessage id="type" /></TableCell>
                                <TableCell><FormattedMessage id="location" /></TableCell>
                                <TableCell><FormattedMessage id="year" /></TableCell>
                                <TableCell><FormattedMessage id="condition" /></TableCell>
                                <TableCell><FormattedMessage id="transmission" /></TableCell>
                                <TableCell><FormattedMessage id="mileage" /></TableCell>
                                <TableCell><FormattedMessage id="price" /></TableCell>
                                <TableCell><FormattedMessage id="status" /></TableCell>
                                <TableCell align="center"><FormattedMessage id="actions" /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(car => (
                                <TableRow 
                                    key={car.id}
                                    sx={{ 
                                        '&:hover': { 
                                            backgroundColor: '#f5f9ff',
                                            transition: 'background-color 0.2s'
                                        },
                                        '& td': { py: 1.5 }
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: 500 }}>{car.name}</TableCell>
                                    <TableCell>{car.brand}</TableCell>
                                    <TableCell>{car.model}</TableCell>
                                    <TableCell>{car.type}</TableCell>
                                    <TableCell>{car.location}</TableCell>
                                    <TableCell>{car.year}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={car.condition} 
                                            color={car.condition === 'New' ? 'success' : 'default'}
                                            size="small"
                                            sx={{ 
                                                borderRadius: 1.5,
                                                '& .MuiChip-label': { px: 1.5 }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{car.transmission}</TableCell>
                                    <TableCell>{car.mileage}</TableCell>
                                    <TableCell sx={{ fontWeight: 500, color: '#1976d2' }}>
                                        {car.price.toLocaleString()} AED
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={car.status} 
                                            color={
                                                car.status === 'available' ? 'success' : 
                                                car.status === 'reserved' ? 'warning' : 
                                                'error'
                                            }
                                            size="small"
                                            sx={{ 
                                                borderRadius: 1.5,
                                                '& .MuiChip-label': { px: 1.5 }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            gap: 1, 
                                            justifyContent: 'center'
                                        }}>
                                            <Link href={`/admin/cars/form/${car.id}`} passHref>
                                                <IconButton 
                                                    color="primary" 
                                                    size="small"
                                                    sx={{ 
                                                        backgroundColor: 'rgba(25, 118, 210, 0.05)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(25, 118, 210, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Link>
                                            <IconButton 
                                                color="error" 
                                                size="small"
                                                onClick={() => handleDelete(car)}
                                                sx={{ 
                                                    backgroundColor: 'rgba(211, 47, 47, 0.05)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(211, 47, 47, 0.1)'
                                                    }
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={filteredCars.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        borderTop: '1px solid #f0f0f0',
                        backgroundColor: '#f8f9fa',
                        '.MuiTablePagination-select': {
                            borderRadius: 2
                        }
                    }}
                />
            </Paper>

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
                            id="confirm_delete_car_message" 
                            defaultMessage="Are you sure you want to delete the car {car}? This action cannot be undone."
                            values={{
                                car: <strong>{carToDelete?.name || ''}</strong>
                            }}
                        />
                    </Typography>
                    {carToDelete && (
                        <Box sx={{ mt: 2, color: 'text.secondary' }}>
                            <Typography variant="body2">
                                <FormattedMessage 
                                    id="car_delete_details" 
                                    defaultMessage="Brand: {brand}, Model: {model}"
                                    values={{
                                        brand: carToDelete.brand,
                                        model: carToDelete.model
                                    }}
                                />
                            </Typography>
                        </Box>
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

export default memo(CarsPage);
