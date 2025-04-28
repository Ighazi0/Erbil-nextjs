'use client'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import Link from 'next/link';
import { FaArrowLeft, FaCar, FaUser, FaCalendar, FaMoneyBill } from 'react-icons/fa';
import { useSnackbarContext } from '@/contexts/SnackbarContext';

export default function OrderDetails({ params }) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showSnackbar } = useSnackbarContext();
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderRef = doc(db, 'orders', params.id);
                const orderSnap = await getDoc(orderRef);
                
                if (orderSnap.exists()) {
                    const orderData = orderSnap.data();
                    orderData.id = orderSnap.id;

                    // Fetch car details
                    if (orderData.car) {
                        const carRef = doc(db, orderData.car);
                        const carSnap = await getDoc(carRef);
                        if (carSnap.exists()) {
                            const carData = carSnap.data();
                            
                            // Fetch brand
                            if (carData.brand) {
                                const brandSnap = await getDoc(carData.brand);
                                if (brandSnap.exists()) {
                                    carData.brandName = brandSnap.data().name_en;
                                }
                            }
                            
                            // Fetch model
                            if (carData.model) {
                                const modelSnap = await getDoc(carData.model);
                                if (modelSnap.exists()) {
                                    carData.modelName = modelSnap.data().name_en;
                                }
                            }

                            // Fetch location
                            if (carData.location) {
                                const locationSnap = await getDoc(carData.location);
                                if (locationSnap.exists()) {
                                    carData.locationName = locationSnap.data().name_en;
                                }
                            }

                            orderData.carDetails = carData;
                        }
                    }

                    // Fetch user details
                    if (orderData.user) {
                        const userRef = doc(db, orderData.user);
                        const userSnap = await getDoc(userRef);
                        if (userSnap.exists()) {
                            orderData.userDetails = userSnap.data();
                        }
                    }

                    setOrder(orderData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };

        if (params.id) {
            fetchOrderDetails();
        }
    }, [params.id]);

    const getStatusBadge = (startDate, endDate) => {
        const now = new Date();
        const start = startDate.toDate();
        const end = endDate.toDate();

        if (now < start) {
            return <Badge bg="info">Upcoming</Badge>;
        } else if (now > end) {
            return <Badge bg="secondary">Completed</Badge>;
        } else {
            return <Badge bg="success">Active</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="p-4">
                <Card>
                    <Card.Body>Loading order details...</Card.Body>
                </Card>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-4">
                <Card>
                    <Card.Body>Order not found</Card.Body>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="mb-4">
                <Link href="/admin/orders" className="text-decoration-none">
                    <FaArrowLeft className="me-2" />
                    Back to Orders
                </Link>
            </div>

            <Card className="mb-4">
                <Card.Header className="bg-white py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Order Details #{order.id.slice(0, 8)}</h5>
                        {getStatusBadge(order.from, order.to)}
                    </div>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6} className="mb-4">
                            <Card className="h-100">
                                <Card.Body>
                                    <h6 className="d-flex align-items-center mb-3">
                                        <FaCar className="me-2 text-primary" />
                                        Car Information
                                    </h6>
                                    {order.carDetails && (
                                        <>
                                            <p className="mb-1">
                                                <strong>Brand & Model:</strong> {order.carDetails.brandName} {order.carDetails.modelName}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Name:</strong> {order.carDetails.name}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Location:</strong> {order.carDetails.locationName || 'N/A'}
                                            </p>
                                            <p className="mb-0">
                                                <strong>Daily Rate:</strong> {order.carDetails.price} AED
                                            </p>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} className="mb-4">
                            <Card className="h-100">
                                <Card.Body>
                                    <h6 className="d-flex align-items-center mb-3">
                                        <FaUser className="me-2 text-primary" />
                                        Customer Information
                                    </h6>
                                    {order.userDetails && (
                                        <>
                                            <p className="mb-1">
                                                <strong>Name:</strong> {order.userDetails.name}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Email:</strong> {order.userDetails.email}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Phone:</strong> {order.userDetails.phone || 'N/A'}
                                            </p>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} className="mb-4">
                            <Card className="h-100">
                                <Card.Body>
                                    <h6 className="d-flex align-items-center mb-3">
                                        <FaCalendar className="me-2 text-primary" />
                                        Rental Period
                                    </h6>
                                    <p className="mb-1">
                                        <strong>Start Date:</strong> {format(order.from.toDate(), 'MMM d, yyyy')}
                                    </p>
                                    <p className="mb-1">
                                        <strong>End Date:</strong> {format(order.to.toDate(), 'MMM d, yyyy')}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Duration:</strong> {order.days} days
                                    </p>
                                    <p className="mb-0">
                                        <strong>Created At:</strong> {format(order.createdAt.toDate(), 'MMM d, yyyy HH:mm')}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} className="mb-4">
                            <Card className="h-100 bg-primary text-white">
                                <Card.Body>
                                    <h6 className="d-flex align-items-center mb-3">
                                        <FaMoneyBill className="me-2" />
                                        Payment Information
                                    </h6>
                                    <p className="mb-1">
                                        <strong>Daily Rate:</strong> {order.carDetails?.price} AED
                                    </p>
                                    <p className="mb-1">
                                        <strong>Number of Days:</strong> {order.days}
                                    </p>
                                    <p className="mb-0">
                                        <strong>Total Amount:</strong> {order.totalPrice} AED
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
} 