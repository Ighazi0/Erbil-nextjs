"use client"
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/navigation';
import { useSnackbarContext } from '@/contexts/SnackbarContext';
import { useCarForm } from '../hooks/useCarForm';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ImageUpload from '../components/ImageUpload';
import { FormFields } from '../components/FormFields';
import {
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    Divider,
    Container,
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { db, storage } from '@/app/firebase';
import { updateDoc, doc, setDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Form = ({ params }) => {
    const router = useRouter();
    const { showSnackbar } = useSnackbarContext();
    const intl = useIntl();

    const carId = params?.id?.[0];
    const isEditMode = Boolean(carId);

    const {
        formMethods,
        carTypes,
        locations,
        brands,
        models,
        isLoading,
        imageFiles,
        setImageFiles,
        imagePreviews,
        setImagePreviews,
        uploadProgress,
        setUploadProgress,
        setCarTypes,
        setLocations,
        setBrands,
        setModels,
    } = useCarForm(carId, showSnackbar);

    const handleCreateNewType = async (data) => {
        try {
            const newTypeRef = doc(collection(db, 'types'));
            const newType = {
                name_en: data.name_en,
                name_ar: data.name_ar,
                createdAt: new Date()
            };
            await setDoc(newTypeRef, newType);

            const newTypeWithId = { id: newTypeRef.id, ...newType };
            setCarTypes(prev => [...prev, newTypeWithId]);
            showSnackbar('New type added successfully', 'success');

            formMethods.setValue('type', newTypeWithId);
        } catch (error) {
            console.error('Error creating new type:', error);
            showSnackbar('Error creating new type', 'error');
        }
    };

    const handleCreateNewLocation = async (data) => {
        try {
            const newLocationRef = doc(collection(db, 'locations'));
            const newLocation = {
                name_en: data.name_en,
                name_ar: data.name_ar,
                createdAt: new Date()
            };
            await setDoc(newLocationRef, newLocation);

            const newLocationWithId = { id: newLocationRef.id, ...newLocation };
            setLocations(prev => [...prev, newLocationWithId]);
            showSnackbar('New location added successfully', 'success');

            formMethods.setValue('location', newLocationWithId);
        } catch (error) {
            console.error('Error creating new location:', error);
            showSnackbar('Error creating new location', 'error');
        }
    };

    const handleCreateNewBrand = async (data) => {
        try {
            const newBrandRef = doc(collection(db, 'brands'));
            const newBrand = {
                name_en: data.name_en,
                name_ar: data.name_ar,
                createdAt: new Date()
            };
            await setDoc(newBrandRef, newBrand);

            const newBrandWithId = { id: newBrandRef.id, ...newBrand };
            setBrands(prev => [...prev, newBrandWithId]);
            showSnackbar('New brand added successfully', 'success');

            formMethods.setValue('brand', newBrandWithId);
        } catch (error) {
            console.error('Error creating new brand:', error);
            showSnackbar('Error creating new brand', 'error');
        }
    };

    const handleCreateNewModel = async (data) => {
        try {
            const newModelRef = doc(collection(db, 'models'));
            const newModel = {
                name_en: data.name_en,
                name_ar: data.name_ar,
                brand: doc(db, 'brands', data.brand.id),
                createdAt: new Date()
            };
            await setDoc(newModelRef, newModel);

            const newModelWithId = {
                id: newModelRef.id,
                ...data,
                brand: data.brand // Keep the full brand object for the UI
            };
            setModels(prev => [...prev, newModelWithId]);
            showSnackbar('New model added successfully', 'success');

            formMethods.setValue('model', newModelWithId);
        } catch (error) {
            console.error('Error creating new model:', error);
            showSnackbar('Error creating new model', 'error');
        }
    };

    const handleImageChange = useCallback((e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImageFiles(prev => [...prev, ...files]);
        setImagePreviews(prev => [...prev, ...newPreviews]);
    }, []);

    const removeImage = useCallback((index) => {
        if (imagePreviews[index].startsWith('blob:')) {
            URL.revokeObjectURL(imagePreviews[index]);
        }
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    }, [imagePreviews]);

    const uploadImages = async () => {
        const formValues = formMethods._formValues;
        if (!imageFiles.length && formValues?.imageUrl) return [formValues?.imageUrl];
        if (!imageFiles.length) return [];

        setUploadProgress(true);
        try {
            const uploadPromises = imageFiles.map(async (file) => {
                const storageRef = ref(storage, `cars/${crypto.randomUUID()}-${file.name}`);
                await uploadBytes(storageRef, file);
                return getDownloadURL(storageRef);
            });

            const urls = await Promise.all(uploadPromises);
            setUploadProgress(false);
            return urls;
        } catch (error) {
            console.error('Error uploading images:', error);
            throw error;
        }
    };

    const onSubmit = async (formData) => {
        try {
            const images = await uploadImages();

            const carData = {
                ...formData,
                location: doc(db, 'locations', formData.location?.id),
                type: doc(db, 'types', formData.type?.id),
                brand: formData.brand?.id ? doc(db, 'brands', formData.brand.id) : null,
                model: formData.model?.id ? doc(db, 'models', formData.model.id) : null,
                imageUrl: images.length > 0 ? images[0] : '',
                images: images,
                price: Number(formData.price),
                condition: formData.condition || 'New',
                cylinders: Number(formData.cylinders) || 6,
                stockNumber: formData.stockNumber || '',
                fuelType: formData.fuelType || 'Petrol',
                vinNumber: formData.vinNumber || '',
                doors: Number(formData.doors) || 4,
                year: Number(formData.year) || new Date().getFullYear(),
                color: formData.color || '',
                mileage: formData.mileage || '',
                seats: Number(formData.seats) || 5,
                transmission: formData.transmission || 'Auto',
                cityMpg: Number(formData.cityMpg) || 0,
                engineSize: formData.engineSize || '',
                highwayMpg: Number(formData.highwayMpg) || 0,
                driverType: formData.driverType || '2WD',
                features: formData.features || {},
                updatedAt: new Date(),
            };

            if (!isEditMode) {
                carData.createdAt = new Date();
            }

            const carRef = doc(db, 'cars', isEditMode ? carId : crypto.randomUUID());
            await (isEditMode ? updateDoc(carRef, carData) : setDoc(carRef, carData));

            showSnackbar(`Car ${isEditMode ? 'updated' : 'added'} successfully`, 'success');
            router.push('/admin/cars');
        } catch (error) {
            console.log(error,'dataerrorr');

            console.error('Error saving car:', error);
            showSnackbar(`Error ${isEditMode ? 'updating' : 'adding'} car`, 'error');
        }
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            py: 4,
        }}>
            <Container maxWidth="lg">
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        backgroundColor: '#fff',
                        mb: 4
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 600,
                                color: '#1976d2'
                            }}
                        >
                            <FormattedMessage
                                id={isEditMode ? "editCar" : "addNewCar"}
                                defaultMessage={isEditMode ? "Edit Car" : "Add New Car"}
                            />
                        </Typography>
                        <Link href="/admin/cars">
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none'
                                }}
                            >
                                <FormattedMessage id="back" defaultMessage="Back" />
                            </Button>
                        </Link>
                    </Box>
                    <Divider sx={{ mb: 4 }} />
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <FormFields
                                control={formMethods.control}
                                carTypes={carTypes}
                                locations={locations}
                                brands={brands}
                                models={models}
                                intl={intl}
                                onCreateNewType={handleCreateNewType}
                                onCreateNewLocation={handleCreateNewLocation}
                                onCreateNewBrand={handleCreateNewBrand}
                                onCreateNewModel={handleCreateNewModel}
                                formMethods={formMethods}
                            />
                            <Grid item xs={12}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        mb: 3,
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: 3
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 3,
                                            color: '#1976d2',
                                            fontWeight: 600
                                        }}
                                    >
                                        <FormattedMessage id="images" defaultMessage="Images" />
                                    </Typography>
                                    <ImageUpload
                                        handleImageChange={handleImageChange}
                                        uploadProgress={uploadProgress}
                                        imagePreviews={imagePreviews}
                                        removeImage={removeImage}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 2,
                                    mt: 2
                                }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => router.push('/admin/cars')}
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            px: 4
                                        }}
                                    >
                                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            px: 4
                                        }}
                                    >
                                        {isEditMode ? (
                                            <FormattedMessage id="updateCar" defaultMessage="Update Car" />
                                        ) : (
                                            <FormattedMessage id="addCar" defaultMessage="Add Car" />
                                        )}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Form;
