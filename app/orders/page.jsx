"use client";
import { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { FormattedMessage } from 'react-intl';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Skeleton,
    Button,
    Alert,
    Divider
} from '@mui/material';
import {
    DirectionsCar,
    CalendarMonth,
    LocationOn,
    AttachMoney,
    Schedule
} from '@mui/icons-material';
import Link from 'next/link';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;

            try {
                const userRef = doc(db, 'users', user.uid);
                const ordersQuery = query(
                    collection(db, 'orders'),
                    where('user', '==', userRef)
                );

                const ordersSnapshot = await getDocs(ordersQuery);
                const ordersPromises = ordersSnapshot.docs.map(async (orderDoc) => {
                    const orderData = orderDoc.data();
                    const order = {
                        id: orderDoc.id,
                        ...orderData,
                        from: orderData.from,
                        to: orderData.to,
                        days: orderData.days,
                        totalPrice: orderData.totalPrice,
                        createdAt: orderData.createdAt,
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

                    return order;
                });

                const ordersData = await Promise.all(ordersPromises);
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const getStatusChip = (from, to) => {
        const now = new Date();
        const fromDate = from.toDate();
        const toDate = to.toDate();

        if (now < fromDate) {
            return (
                <Chip 
                    label={<FormattedMessage id="upcoming" defaultMessage="Upcoming" />}
                    color="primary"
                    variant="outlined"
                />
            );
        } else if (now >= fromDate && now <= toDate) {
            return (
                <Chip 
                    label={<FormattedMessage id="active" defaultMessage="Active" />}
                    color="success"
                />
            );
        } else {
            return (
                <Chip 
                    label={<FormattedMessage id="completed" defaultMessage="Completed" />}
                    color="default"
                />
            );
        }
    };

    if (loading) {
        return (
            <Layout>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        {[1, 2, 3].map((item) => (
                            <Grid item xs={12} key={item}>
                                <Card>
                                    <CardContent>
                                        <Skeleton variant="rectangular" height={200} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Layout>
        );
    }

    if (!orders.length) {
        return (
            <Layout>
                <Box sx={{ p: 3 }}>
                    <Alert severity="info">
                        <FormattedMessage id="no_orders" defaultMessage="You don't have any orders yet." />
                    </Alert>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    <FormattedMessage id="my_orders" defaultMessage="My Orders" />
                </Typography>
                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid item xs={12} key={order.id}>
                            <Card sx={{ 
                                borderRadius: 2,
                                boxShadow: 2,
                                '&:hover': { boxShadow: 4 }
                            }}>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={4}>
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
                                        <Grid item xs={12} sm={8}>
                                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <Box>
                                                        <Typography variant="h5" gutterBottom>
                                                            {order.car?.brandName} {order.car?.modelName}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="text.secondary">
                                                            {order.car?.name}
                                                        </Typography>
                                                    </Box>
                                                    {getStatusChip(order.from, order.to)}
                                                </Box>

                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                            <CalendarMonth sx={{ color: 'text.secondary', mr: 1 }} />
                                                            <Typography variant="body1">
                                                                {format(order.from.toDate(), 'MMM d, yyyy')} - {format(order.to.toDate(), 'MMM d, yyyy')}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                            <Schedule sx={{ color: 'text.secondary', mr: 1 }} />
                                                            <Typography variant="body1">
                                                                <FormattedMessage 
                                                                    id="duration_days" 
                                                                    defaultMessage="{days} days"
                                                                    values={{ days: order.days }}
                                                                />
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>

                                                <Divider sx={{ my: 2 }} />

                                                <Box sx={{ 
                                                    mt: 'auto',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <AttachMoney sx={{ color: 'primary.main' }} />
                                                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                                                            {order.totalPrice} AED
                                                        </Typography>
                                                    </Box>
                                                    <Button 
                                                        variant="outlined"
                                                        color="primary"
                                                        component={Link}
                                                        href={`/orders/${order.id}`}
                                                        sx={{ 
                                                            borderRadius: 2,
                                                            textTransform: 'none'
                                                        }}
                                                    >
                                                        <FormattedMessage id="view_details" defaultMessage="View Details" />
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Layout>
    );
};

export default OrdersPage; 