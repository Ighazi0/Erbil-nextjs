import React from 'react';
import {
    Box,
    Paper,
    Skeleton,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';

const LoadingSkeleton = () => {
    return (
        <Box className="p-3 p-md-4 w-100 min-vh-100 bg-light">
            {/* Header Section */}
            <Paper className="mb-4 p-4 bg-white shadow" sx={{ borderRadius: 3 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Skeleton variant="text" width={200} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
                    </Grid>
                </Grid>
            </Paper>

            {/* Search Section */}
            <Paper className="mb-4 p-3" sx={{ borderRadius: 3 }}>
                <Skeleton variant="rectangular" width={250} height={40} sx={{ borderRadius: 2 }} />
            </Paper>

            {/* Table Section */}
            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                                <TableCell>
                                    <Skeleton variant="text" width={150} />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={150} />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton variant="text" width={100} />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <Skeleton variant="circular" width={32} height={32} />
                                            <Skeleton variant="circular" width={32} height={32} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
                    <Skeleton variant="rectangular" width={300} height={32} sx={{ borderRadius: 1 }} />
                </Box>
            </Paper>
        </Box>
    );
};

export default LoadingSkeleton; 