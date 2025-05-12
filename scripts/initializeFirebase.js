import { db } from '@/app/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';

const initializeCollections = async () => {
    // Initialize car types
    const carTypes = [
        { id: 'sedan', name: 'Sedan', description: 'A standard sedan car' },
        { id: 'suv', name: 'SUV', description: 'Sport Utility Vehicle' },
        { id: 'sports', name: 'Sports Car', description: 'High-performance sports car' }
    ];

    const locations = [
        {
            id: 'location1',
            name: 'Downtown Branch',
            address: '123 Main St',
            city: 'New York',
            coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        {
            id: 'location2',
            name: 'Airport Terminal',
            address: '456 Airport Rd',
            city: 'New York',
            coordinates: { lat: 40.6413, lng: -73.7781 }
        }
    ];

    // Add car types
    for (const type of carTypes) {
        await setDoc(doc(db, 'carTypes', type.id), type);
    }

    // Add locations
    for (const location of locations) {
        await setDoc(doc(db, 'locations', location.id), location);
    }
};

initializeCollections().then(() => console.log('Collections initialized')); 