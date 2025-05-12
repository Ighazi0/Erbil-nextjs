"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Grid, Card, CardContent, Typography, CardHeader, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, useTheme, CircularProgress } from '@mui/material'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { DirectionsCar, AttachMoney, TimeToLeave, TrendingUp } from '@mui/icons-material'
import { FormattedMessage } from 'react-intl'
import {collection, query, where, getCountFromServer, getAggregateFromServer, sum} from "firebase/firestore";
import {db} from "@/app/firebase";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Title, Tooltip, Legend)

const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [availableCars, setAvailableCars] = useState(0);
    const [orders, setOrders] = useState(0);
    const [profit, setProfit] = useState(0);
    const [monthlyProfit, setMonthlyProfit] = useState([])
    const router = useRouter();
    const theme = useTheme();

    useEffect(() => {
        const verifyAdmin = async () => {
            try {                
                const response = await fetch('/api/auth/verify-role');                
                const data = await response.json();
                
                
                if (!response.ok || data.role !== 'admin') {
                    router.push('/login');
                    return;
                }
                
                setIsLoading(false);
            } catch (error) {
                console.error('Admin verification error:', error);
                router.push('/login');
            }
        };

        verifyAdmin();
    }, [router]);

    useEffect(() => {
        const analysis = async () => {
            const carsColl = collection(db, "cars");
            const carsQ = query(carsColl, where('status', '==', 'available'));
            const carsSnapshot = await getCountFromServer(carsQ);
            setAvailableCars(carsSnapshot.data().count ?? 0)
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();
            const startOfMonth = new Date(`${currentYear}-${(currentMonth+1)}-01`);
            const endOfMonth = new Date(`${currentYear}-${(currentMonth+1)}-31`);
            const ordersColl = collection(db, "orders");
            const ordersQ = query(ordersColl, where('payment', '==', 'success'), where('from', '>=', startOfMonth), where('from', '<=', endOfMonth));
            const ordersSnapshot = await getCountFromServer(ordersQ);
            setOrders(ordersSnapshot.data().count ?? 0)
            const ordersProfitProfitColl = collection(db, 'orders');
            const ordersProfitQ = query(ordersProfitProfitColl, where('payment', '==', 'success'), where('from', '>=', startOfMonth), where('from', '<=', endOfMonth));
            const ordersProfitProfitSnapshot = await getAggregateFromServer(ordersProfitQ, {
                totalProfit: sum('totalPrice'),
            });
            setProfit(ordersProfitProfitSnapshot.data().totalProfit);
            const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            const monthlyProfitLocal = {};
            const promises = months.map(async (month) => {
                const startOfMonth = dayjs(new Date(currentYear, month - 1, 1)).startOf('month').toDate();
                const endOfMonth = dayjs(new Date(currentYear, month - 1, 1)).endOf('month').toDate();
                const shippingAccountingQ = query(
                    collection(db, "orders"),
                    where('payment', '==', 'success'),
                    where('from', '>=', startOfMonth),
                    where('from', '<=', endOfMonth)
                );
                const shippingSnapshot = await getAggregateFromServer(shippingAccountingQ, {
                    totalProfit: sum('totalPrice'),
                })
                const shippingProfit = shippingSnapshot.data().totalProfit || 0;
                monthlyProfitLocal[month - 1] = (shippingProfit)
            })
            await Promise.all(promises);
            setMonthlyProfit(monthlyProfitLocal);
        }
        analysis();
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh' 
            }}>
                <CircularProgress />
            </Box>
        );
    }

    const cardStyles = {
        borderRadius: 3,
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(0,0,0,0.1)',
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'translateY(-4px)'
        }
    }

    const iconStyles = {
        width: 56,
        height: 56,
        padding: 1.5,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2
    }

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Profit',
                data: [0,1,2,3,4,5,6,7,8,9,10,11].map(i=>monthlyProfit[i]),
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.light + '40',
                fill: true,
                tension: 0.4
            },
        ],
    }

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { boxWidth: 20, padding: 20 }
            }
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            }
        }
    }

    return (
        <Box sx={{ 
            padding: { xs: 1, sm: 2, md: 3 },
            backgroundColor: '#f8f9fa', 
            minHeight: '100vh' 
        }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} sm={6} lg={4}>
                    <Card sx={{
                        ...cardStyles,
                        '& .MuiCardContent-root': {
                            padding: { xs: 2, sm: 3 }
                        }
                    }}>
                        <CardContent>
                            <Box sx={{ ...iconStyles, bgcolor: theme.palette.primary.main + '20' }}>
                                <DirectionsCar sx={{ color: theme.palette.primary.main, fontSize: 32 }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>{availableCars}</Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                <FormattedMessage id="totalCarsAvailable" />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                    <Card sx={{
                        ...cardStyles,
                        '& .MuiCardContent-root': {
                            padding: { xs: 2, sm: 3 }
                        }
                    }}>
                        <CardContent>
                            <Box sx={{ ...iconStyles, bgcolor: theme.palette.warning.main + '20' }}>
                                <TimeToLeave sx={{ color: theme.palette.warning.main, fontSize: 32 }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>{orders}</Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                <FormattedMessage id="carsRentedThisMonth" />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                    <Card sx={{
                        ...cardStyles,
                        '& .MuiCardContent-root': {
                            padding: { xs: 2, sm: 3 }
                        }
                    }}>
                        <CardContent>
                            <Box sx={{ ...iconStyles, bgcolor: theme.palette.success.main + '20' }}>
                                <AttachMoney sx={{ color: theme.palette.success.main, fontSize: 32 }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>{profit}</Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                <FormattedMessage id="totalRevenueThisMonth" />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={12}>
                    <Card sx={cardStyles}>
                        <CardHeader 
                            title={<FormattedMessage id="monthlyPerformance" />}
                            sx={{ 
                                '& .MuiCardHeader-title': { 
                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                    fontWeight: 600
                                },
                                padding: { xs: 2, sm: 3 }
                            }}
                        />
                        <CardContent sx={{ height: { xs: '300px', sm: '400px' } }}>
                            <Line 
                                data={lineData} 
                                options={lineChartOptions}
                                height={window?.innerWidth < 768 ? 250 : 400}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminDashboard
