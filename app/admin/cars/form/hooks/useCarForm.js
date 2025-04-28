import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

export const useCarForm = (carId, showSnackbar) => {
    const [carTypes, setCarTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(false);

    const formMethods = useForm({
        defaultValues: {
            name: '',
            model: '',
            brand: '',
            type: '',
            transmission: 'Auto',
            price: '',
            description: '',
            imageUrl: '',
            status: 'available',
            location: '',
            year: new Date().getFullYear().toString(),
            color: '',
            seats: '5',
            condition: 'New',
            cylinders: '6',
            stockNumber: '',
            fuelType: 'Petrol',
            vinNumber: '',
            doors: '4',
            mileage: '',
            cityMpg: '18',
            engineSize: '',
            highwayMpg: '28',
            driverType: '2WD'
        }
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                // First fetch brands
                const brandsSnapshot = await getDocs(collection(db, 'brands'));
                const brandsData = brandsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBrands(brandsData);

                // Then fetch models with brand references
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

                // Fetch other data
                const [typesSnapshot, locationsSnapshot] = await Promise.all([
                    getDocs(collection(db, 'types')),
                    getDocs(collection(db, 'locations')),
                ]);

                setCarTypes(typesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })));

                setLocations(locationsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })));

            } catch (error) {
                console.error('Error fetching metadata:', error);
                showSnackbar('Error fetching form data', 'error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetadata();
    }, [showSnackbar]);

    useEffect(() => {
        if (carId) {
            fetchCarData();
        }
        return () => {
            imagePreviews.forEach(preview => {
                if (preview.startsWith('blob:')) {
                    URL.revokeObjectURL(preview);
                }
            });
        };
    }, [carId]);

    const fetchCarData = async () => {
        try {
            const carDoc = await getDoc(doc(db, 'cars', carId));
            if (carDoc.exists()) {
                const data = carDoc.data();
                
                // Get brand data
                if (data.brand) {
                    const brandDoc = await getDoc(data.brand);
                    if (brandDoc.exists()) {
                        data.brand = { id: brandDoc.id, ...brandDoc.data() };
                    }
                }

                // Get model data
                if (data.model) {
                    const modelDoc = await getDoc(data.model);
                    if (modelDoc.exists()) {
                        data.model = { id: modelDoc.id, ...modelDoc.data() };
                    }
                }

                // Get type data
                if (data.type) {
                    const typeDoc = await getDoc(data.type);
                    if (typeDoc.exists()) {
                        data.type = { id: typeDoc.id, ...typeDoc.data() };
                    }
                }

                // Get location data
                if (data.location) {
                    const locationDoc = await getDoc(data.location);
                    if (locationDoc.exists()) {
                        data.location = { id: locationDoc.id, ...locationDoc.data() };
                    }
                }

                formMethods.reset(data);
                if (data.images) {
                    setImagePreviews(data.images);
                }
            }
        } catch (error) {
            console.error('Error fetching car data:', error);
            showSnackbar('Error fetching car data', 'error');
        }
    };

    return {
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
    };
}; 