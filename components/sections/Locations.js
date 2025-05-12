import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Locations = () => {
    const locations = [
        {
            city: 'Amman',
            address: 'Main Branch, Amman, Jordan',
            link: '/contact'
        },
        {
            city: 'Zarqa',
            address: 'Zarqa Branch, Zarqa, Jordan',
            link: '/contact'
        },
        {
            city: 'Irbid',
            address: 'Irbid Branch, Irbid, Jordan',
            link: '/contact'
        }
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Locations</h2>
                    <p className="text-gray-600">Visit us at any of our branches</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {locations.map((location, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center justify-center mb-4">
                                <FaMapMarkerAlt className="text-4xl text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-2">{location.city}</h3>
                            <p className="text-gray-600 text-center mb-4">{location.address}</p>
                            <div className="text-center">
                                <Link href={location.link} className="text-blue-600 hover:text-blue-800 font-medium">
                                    Get Directions
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Locations;
