"use client";
import { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Button,
    Divider,
    Container,
    Paper,
} from '@mui/material';
import {
    ArrowBack,
    DirectionsCar,
    CalendarMonth,
    LocationOn,
    AttachMoney,
    Schedule,
    Person,
    Email,
    Phone,
} from '@mui/icons-material';

export default function OrderDetails({ params }) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const orderId = params.id;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!user || !orderId) return;

            try {
                const orderRef = doc(db, 'orders', orderId);
                const orderSnap = await getDoc(orderRef);

                if (!orderSnap.exists()) {
                    throw new Error('Order not found');
                }

                const orderData = orderSnap.data();
                const order = {
                    id: orderSnap.id,
                    ...orderData,
                };

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

                        order.car = {
                            id: carSnap.id,
                            ...carData
                        };
                    }
                }

                setOrder(order);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [user, orderId]);

    if (loading) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Box sx={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography>Loading...</Typography>
                    </Box>
                </Container>
            </Layout>
        );
    }

    if (!order) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Typography color="error">
                        <FormattedMessage id="order_not_found" defaultMessage="Order not found" />
                    </Typography>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Button
                        component={Link}
                        href="/orders"
                        startIcon={<ArrowBack />}
                        sx={{ mb: 2 }}
                    >
                        <FormattedMessage id="back_to_orders" defaultMessage="Back to Orders" />
                    </Button>
                    <Typography variant="h4" gutterBottom>
                        <FormattedMessage id="order_details" defaultMessage="Order Details" />
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Car Details */}
                    <Grid item xs={12}>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                <DirectionsCar sx={{ mr: 1, verticalAlign: 'middle' }} />
                                <FormattedMessage id="car_details" defaultMessage="Car Details" />
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    {order.car?.images?.[0] && (
                                        <Box
                                            component="img"
                                            src={order.car.images[0]}
                                            alt={order.car.name}
                                            sx={{
                                                width: '100%',
                                                height: 200,
                                                objectFit: 'cover',
                                                borderRadius: 2
                                            }}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Typography variant="h5">
                                        {order.car?.brandName} {order.car?.modelName}
                                    </Typography>
                                    <Typography color="text.secondary" gutterBottom>
                                        {order.car?.name}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body1" gutterBottom>
                                            <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                                            {order.car?.location?.name || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Rental Details */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                <CalendarMonth sx={{ mr: 1, verticalAlign: 'middle' }} />
                                <FormattedMessage id="rental_details" defaultMessage="Rental Details" />
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1" gutterBottom>
                                    <FormattedMessage id="rental_period" defaultMessage="Rental Period" />:
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {format(order.from.toDate(), 'MMM d, yyyy')} - {format(order.to.toDate(), 'MMM d, yyyy')}
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                                    <FormattedMessage id="duration" defaultMessage="Duration" />:
                                </Typography>
                                <Typography variant="h6">
                                    {order.days} <FormattedMessage id="days" defaultMessage="days" />
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Payment Details */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                            <Typography variant="h6" gutterBottom>
                                <AttachMoney sx={{ mr: 1, verticalAlign: 'middle' }} />
                                <FormattedMessage id="payment_details" defaultMessage="Payment Details" />
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1" gutterBottom>
                                    <FormattedMessage id="total_amount" defaultMessage="Total Amount" />:
                                </Typography>
                                <Typography variant="h4">
                                    {order.totalPrice} AED
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                                    <FormattedMessage id="daily_rate" defaultMessage="Daily Rate" />: {order.totalPrice / order.days} AED
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
} 