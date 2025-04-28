import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    InputAdornment,
    Autocomplete,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
    Typography,
    Box,
    Divider,
    IconButton,
    Tooltip,
    Stack,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import FeatureSelector from './FeatureSelector';

export const FormFields = React.memo(({ 
    control, 
    carTypes, 
    locations, 
    brands, 
    models,
    intl, 
    onCreateNewType, 
    onCreateNewLocation,
    onCreateNewBrand,
    onCreateNewModel,
    formMethods
}) => {
    const [newTypeDialog, setNewTypeDialog] = React.useState(false);
    const [newLocDialog, setNewLocDialog] = React.useState(false);
    const [newBrandDialog, setNewBrandDialog] = React.useState(false);
    const [newModelDialog, setNewModelDialog] = React.useState(false);

    const FormSection = ({ title, icon, children }) => (
        <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    {icon}
                    <Typography variant="h6" sx={{ ml: 1, color: '#1976d2', fontWeight: 600 }}>
                        {title}
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    {children}
                </Grid>
            </Paper>
        </Grid>
    );

    const NumberField = ({ field, fieldState: { error }, label, min, max, step = 1, startAdornment, endAdornment }) => {
        const handleIncrement = () => {
            const currentValue = Number(field.value) || 0;
            if (!max || currentValue < max) {
                field.onChange(String(currentValue + step));
            }
        };

        const handleDecrement = () => {
            const currentValue = Number(field.value) || 0;
            if (!min || currentValue > min) {
                field.onChange(String(currentValue - step));
            }
        };

        const handleChange = (e) => {
            let value = e.target.value;
            if (value === '') {
                field.onChange(value);
                return;
            }

            const numValue = Number(value);
            if (isNaN(numValue)) return;

            if (min !== undefined && numValue < min) {
                field.onChange(String(min));
            } else if (max !== undefined && numValue > max) {
                field.onChange(String(max));
            } else {
                field.onChange(String(numValue));
            }
        };

        return (
            <TextField
                {...field}
                fullWidth
                type="text"
                label={label}
                error={!!error}
                helperText={error?.message || (min !== undefined && max !== undefined ? `${min} - ${max}` : '')}
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                    startAdornment: startAdornment && (
                        <InputAdornment position="start">
                            {startAdornment}
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {endAdornment}
                            <Tooltip title="Decrease">
                                <IconButton 
                                    size="small" 
                                    onClick={handleDecrement}
                                    disabled={min !== undefined && (Number(field.value) || 0) <= min}
                                >
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Increase">
                                <IconButton 
                                    size="small" 
                                    onClick={handleIncrement}
                                    disabled={max !== undefined && (Number(field.value) || 0) >= max}
                                >
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }}
                sx={{ 
                    '& .MuiOutlinedInput-root': { 
                        borderRadius: 2,
                        backgroundColor: '#fff'
                    }
                }}
            />
        );
    };

    const NewItemDialog = ({ open, onClose, title, icon, type }) => {
        const [value, setValue] = React.useState({ name_en: '', name_ar: '' });
        const [brandValue, setBrandValue] = React.useState(null);

        const handleSubmit = () => {
            if (!value.name_en.trim() || !value.name_ar.trim()) {
                return;
            }

            const submitData = {
                ...value,
                brand: type === 'model' ? brandValue : undefined
            };

            switch(type) {
                case 'type':
                    onCreateNewType(submitData);
                    break;
                case 'location':
                    onCreateNewLocation(submitData);
                    break;
                case 'brand':
                    onCreateNewBrand(submitData);
                    break;
                case 'model':
                    if (!brandValue) {
                        showSnackbar('Please select a brand', 'error');
                        return;
                    }
                    onCreateNewModel({ ...submitData, brand: brandValue });
                    break;
            }
            setValue({ name_en: '', name_ar: '' });
            setBrandValue(null);
            onClose();
        };

        const handleClose = () => {
            setValue({ name_en: '', name_ar: '' });
            setBrandValue(null);
            onClose();
        };

        return (
            <Dialog 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    sx: { borderRadius: 3 }
                }}
            >
                <DialogTitle sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {icon}
                        <FormattedMessage id={title} defaultMessage={title} />
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Stack spacing={2}>
                        {type === 'model' && (
                            <Autocomplete
                                value={brandValue}
                                onChange={(_, newValue) => setBrandValue(newValue)}
                                options={brands}
                                getOptionLabel={(option) => intl.locale === 'ar' ? option?.name_ar : option?.name_en}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={intl.formatMessage({ id: 'brand', defaultMessage: 'Brand' })}
                                        required
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': { 
                                                borderRadius: 2
                                            }
                                        }}
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        {intl.locale === 'ar' ? option.name_ar : option.name_en}
                                    </li>
                                )}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                            />
                        )}
                        <TextField
                            autoFocus={type !== 'model'}
                            margin="dense"
                            label={intl.formatMessage({ id: 'name_en', defaultMessage: 'Name (English)' })}
                            fullWidth
                            value={value.name_en}
                            onChange={(e) => setValue(prev => ({ ...prev, name_en: e.target.value }))}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { 
                                    borderRadius: 2
                                }
                            }}
                        />
                        <TextField
                            margin="dense"
                            label={intl.formatMessage({ id: 'name_ar', defaultMessage: 'Name (Arabic)' })}
                            fullWidth
                            value={value.name_ar}
                            onChange={(e) => setValue(prev => ({ ...prev, name_ar: e.target.value }))}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { 
                                    borderRadius: 2
                                }
                            }}
                            dir="rtl"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 1 }}>
                    <Button 
                        onClick={handleClose} 
                        color="inherit"
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none'
                        }}
                    >
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        color="primary" 
                        variant="contained"
                        disabled={!value.name_en.trim() || !value.name_ar.trim() || (type === 'model' && !brandValue)}
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none'
                        }}
                    >
                        <FormattedMessage id="add" defaultMessage="Add" />
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const SelectWithAdd = ({ 
        field, 
        error, 
        label, 
        options, 
        onAddClick,
        getOptionLabel = (option) => intl.locale === 'ar' ? option?.name_ar : option?.name_en,
        isDisabled = false,
        dependentField = null,
        brandValue = null
    }) => {
        // Memoize filtered options
        const filteredOptions = React.useMemo(() => {
            if (dependentField === 'brand' && brandValue?.id) {
                return options.filter(opt => opt.brand?.id === brandValue.id);
            }
            return options;
        }, [options, dependentField, brandValue]);

        // Debug logging
        React.useEffect(() => {
            if (dependentField === 'brand') {
                console.log('Brand Value:', brandValue);
                console.log('All Models:', options);
                console.log('Filtered Models:', filteredOptions);
            }
        }, [brandValue, options, filteredOptions, dependentField]);

        return (
            <FormControl fullWidth error={!!error}>
                <Autocomplete
                    {...field}
                    options={filteredOptions}
                    getOptionLabel={getOptionLabel}
                    value={field.value || null}
                    onChange={(_, newValue) => {
                        field.onChange(newValue);
                        if (field.name === 'brand') {
                            formMethods.setValue('model', null);
                        }
                    }}
                    disabled={isDisabled || (dependentField === 'brand' && !brandValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            error={!!error}
                            helperText={error?.message || (dependentField === 'brand' && !brandValue ? 'Please select brand first' : '')}
                            sx={{ 
                                '& .MuiOutlinedInput-root': { 
                                    borderRadius: 2,
                                    backgroundColor: '#fff'
                                }
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <li {...props}>
                            {getOptionLabel(option)}
                        </li>
                    )}
                    filterOptions={(options, { inputValue }) => {
                        const filtered = options.filter(option => {
                            const name_en = option.name_en?.toLowerCase() || '';
                            const name_ar = option.name_ar || '';
                            const input = inputValue.toLowerCase();
                            return name_en.includes(input) || name_ar.includes(input);
                        });
                        return filtered;
                    }}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    loading={!options.length}
                    loadingText="Loading..."
                    noOptionsText={intl.formatMessage({ 
                        id: dependentField === 'brand' && !brandValue 
                            ? 'select_brand_first' 
                            : filteredOptions.length === 0 
                                ? 'no_models_for_brand' 
                                : 'no_options',
                        defaultMessage: dependentField === 'brand' && !brandValue 
                            ? 'Please select a brand first' 
                            : filteredOptions.length === 0 
                                ? 'No models available for this brand' 
                                : 'No options'
                    })}
                />
                <Button
                    startIcon={<AddIcon />}
                    onClick={onAddClick}
                    disabled={dependentField === 'brand' && !brandValue}
                    sx={{ 
                        mt: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        backgroundColor: '#fff'
                    }}
                >
                    <FormattedMessage id="add_new" defaultMessage="Add New" />
                </Button>
            </FormControl>
        );
    };

    return (
        <>
            <FormSection 
                title={intl.formatMessage({ id: 'basicInfo', defaultMessage: 'Basic Information' })}
                icon={<DirectionsCarIcon sx={{ color: '#1976d2' }} />}
            >
                <Grid item xs={12} md={6}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Car name is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label={intl.formatMessage({ id: 'carName', defaultMessage: 'Car Name' })}
                                error={!!error}
                                helperText={error?.message}
                                variant="outlined"
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { 
                                        borderRadius: 2,
                                        backgroundColor: '#fff'
                                    }
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: 'Type is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <SelectWithAdd
                                field={field}
                                error={error}
                                label={intl.formatMessage({ id: 'type', defaultMessage: 'Type' })}
                                options={carTypes}
                                onAddClick={() => setNewTypeDialog(true)}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="brand"
                        control={control}
                        rules={{ required: 'Brand is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <SelectWithAdd
                                field={field}
                                error={error}
                                label={intl.formatMessage({ id: 'brand', defaultMessage: 'Brand' })}
                                options={brands}
                                onAddClick={() => setNewBrandDialog(true)}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="model"
                        control={control}
                        rules={{ required: 'Model is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <SelectWithAdd
                                field={field}
                                error={error}
                                label={intl.formatMessage({ id: 'model', defaultMessage: 'Model' })}
                                options={models}
                                onAddClick={() => setNewModelDialog(true)}
                                dependentField="brand"
                                brandValue={formMethods.watch('brand')}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="location"
                        control={control}
                        rules={{ required: 'Location is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <SelectWithAdd
                                field={field}
                                error={error}
                                label={intl.formatMessage({ id: 'location', defaultMessage: 'Location' })}
                                options={locations}
                                onAddClick={() => setNewLocDialog(true)}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="price"
                        control={control}
                        rules={{ 
                            required: 'Price is required',
                            min: { value: 0, message: 'Price must be positive' }
                        }}
                        render={({ field, fieldState }) => (
                            <NumberField
                                field={field}
                                fieldState={fieldState}
                                label={intl.formatMessage({ id: 'price', defaultMessage: 'Price' })}
                                min={0}
                                startAdornment="AED"
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="color"
                        control={control}
                        rules={{ required: 'Color is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type="color"
                                label={intl.formatMessage({ id: 'color', defaultMessage: 'Color' })}
                                error={!!error}
                                helperText={error?.message}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#fff',
                                        '& input[type="color"]': {
                                            padding: 0,
                                            height: '2.5rem',
                                            width: '100%',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                multiline
                                rows={4}
                                label={intl.formatMessage({ id: 'description', defaultMessage: 'Description' })}
                                error={!!error}
                                helperText={error?.message}
                                variant="outlined"
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { 
                                        borderRadius: 2,
                                        backgroundColor: '#fff'
                                    }
                                }}
                            />
                        )}
                    />
                </Grid>
            </FormSection>

            <FormSection 
                title={intl.formatMessage({ id: 'carSpecifications', defaultMessage: 'Car Specifications' })}
                icon={<SettingsIcon sx={{ color: '#1976d2' }} />}
            >
                <Grid item xs={12} md={4}>
                    <Controller
                        name="condition"
                        control={control}
                        defaultValue="New"
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel>{intl.formatMessage({ id: 'condition', defaultMessage: 'Condition' })}</InputLabel>
                                <Select {...field} label={intl.formatMessage({ id: 'condition' })}>
                                    <MenuItem value="New">New</MenuItem>
                                    <MenuItem value="Used">Used</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="cylinders"
                        control={control}
                        defaultValue="6"
                        render={({ field, fieldState }) => (
                            <NumberField
                                field={field}
                                fieldState={fieldState}
                                label={intl.formatMessage({ id: 'cylinders', defaultMessage: 'Cylinders' })}
                                min={1}
                                max={16}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="stockNumber"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label={intl.formatMessage({ id: 'stockNumber', defaultMessage: 'Stock Number' })}
                                error={!!error}
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="fuelType"
                        control={control}
                        defaultValue="Petrol"
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel>{intl.formatMessage({ id: 'fuelType', defaultMessage: 'Fuel Type' })}</InputLabel>
                                <Select {...field} label={intl.formatMessage({ id: 'fuelType' })}>
                                    <MenuItem value="Petrol">Petrol</MenuItem>
                                    <MenuItem value="Diesel">Diesel</MenuItem>
                                    <MenuItem value="Electric">Electric</MenuItem>
                                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="vinNumber"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label={intl.formatMessage({ id: 'vinNumber', defaultMessage: 'VIN Number' })}
                                error={!!error}
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="doors"
                        control={control}
                        defaultValue="4"
                        render={({ field, fieldState }) => (
                            <NumberField
                                field={field}
                                fieldState={fieldState}
                                label={intl.formatMessage({ id: 'doors', defaultMessage: 'Doors' })}
                                min={2}
                                max={6}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="year"
                        control={control}
                        defaultValue={new Date().getFullYear().toString()}
                        render={({ field, fieldState }) => (
                            <NumberField
                                field={field}
                                fieldState={fieldState}
                                label={intl.formatMessage({ id: 'year', defaultMessage: 'Year' })}
                                min={1900}
                                max={new Date().getFullYear() + 1}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="mileage"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label={intl.formatMessage({ id: 'mileage', defaultMessage: 'Mileage' })}
                                error={!!error}
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">k.m</InputAdornment>,
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="seats"
                        control={control}
                        defaultValue="5"
                        render={({ field, fieldState }) => (
                            <NumberField
                                field={field}
                                fieldState={fieldState}
                                label={intl.formatMessage({ id: 'seats', defaultMessage: 'Seats' })}
                                min={2}
                                max={9}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="transmission"
                        control={control}
                        defaultValue="Auto"
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel>{intl.formatMessage({ id: 'transmission', defaultMessage: 'Transmission' })}</InputLabel>
                                <Select {...field} label={intl.formatMessage({ id: 'transmission' })}>
                                    <MenuItem value="Auto">Auto</MenuItem>
                                    <MenuItem value="Manual">Manual</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="cityMpg"
                        control={control}
                        defaultValue="18"
                        render={({ field, fieldState }) => (
                            <NumberField
                                field={field}
                                fieldState={fieldState}
                                label={intl.formatMessage({ id: 'cityMpg', defaultMessage: 'City MPG' })}
                                min={0}
                                max={100}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="engineSize"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label={intl.formatMessage({ id: 'engineSize', defaultMessage: 'Engine Size' })}
                                error={!!error}
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">L</InputAdornment>,
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="highwayMpg"
                        control={control}
                        defaultValue="28"
                        render={({ field, fieldState }) => (
                            <NumberField
                                field={field}
                                fieldState={fieldState}
                                label={intl.formatMessage({ id: 'highwayMpg', defaultMessage: 'Highway MPG' })}
                                min={0}
                                max={100}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Controller
                        name="driverType"
                        control={control}
                        defaultValue="2WD"
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel>{intl.formatMessage({ id: 'driverType', defaultMessage: 'Driver Type' })}</InputLabel>
                                <Select {...field} label={intl.formatMessage({ id: 'driverType' })}>
                                    <MenuItem value="2WD">2WD</MenuItem>
                                    <MenuItem value="4WD">4WD</MenuItem>
                                    <MenuItem value="AWD">AWD</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
            </FormSection>

            <FormSection 
                title={intl.formatMessage({ id: 'features', defaultMessage: 'Features' })}
                icon={<SettingsIcon sx={{ color: '#1976d2' }} />}
            >
                <Grid item xs={12}>
                    <Controller
                        name="features"
                        control={control}
                        defaultValue={{}}
                        render={({ field }) => (
                            <FeatureSelector
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Grid>
            </FormSection>

            <NewItemDialog 
                open={newTypeDialog}
                onClose={() => setNewTypeDialog(false)}
                title="addNewType"
                icon={<SettingsIcon sx={{ color: '#1976d2', mr: 1 }} />}
                type="type"
            />

            <NewItemDialog 
                open={newLocDialog}
                onClose={() => setNewLocDialog(false)}
                title="add_new_location"
                icon={<LocationOnIcon sx={{ color: '#1976d2', mr: 1 }} />}
                type="location"
            />

            <NewItemDialog 
                open={newBrandDialog}
                onClose={() => setNewBrandDialog(false)}
                title="add_new_brand"
                icon={<BrandingWatermarkIcon sx={{ color: '#1976d2', mr: 1 }} />}
                type="brand"
            />

            <NewItemDialog 
                open={newModelDialog}
                onClose={() => setNewModelDialog(false)}
                title="add_new_model"
                icon={<DirectionsCarIcon sx={{ color: '#1976d2', mr: 1 }} />}
                type="model"
            />
        </>
    );
});

FormFields.displayName = 'FormFields'; 