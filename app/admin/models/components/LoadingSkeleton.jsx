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
    TableCell,
} from '@mui/material';

const LoadingSkeleton = () => {
    return (
        <Box className="p-3 p-md-4 w-100 min-vh-100 bg-light">
            {/* Header Skeleton */}
            <Paper className="mb-4 p-4 bg-white shadow">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
                    <Skeleton variant="text" width={200} height={40} />
                    <Skeleton variant="rounded" width={150} height={45} />
                </div>
            </Paper>

            {/* Search Bar Skeleton */}
            <Paper className="mb-4 p-3">
                <Skeleton variant="rounded" width={250} height={40} />
            </Paper>

            {/* Table Skeleton */}
            <Paper className="w-100 overflow-hidden shadow">
                <TableContainer>
                    <Table>
                        <TableHead className="bg-light">
                            <TableRow>
                                <TableCell>
                                    <Skeleton variant="text" width={150} />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={150} />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={100} />
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
                                    <TableCell>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <Skeleton variant="circular" width={30} height={30} />
                                            <Skeleton variant="circular" width={30} height={30} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ p: 2 }}>
                    <Skeleton variant="rounded" width="100%" height={50} />
                </Box>
            </Paper>
        </Box>
    );
};

export default LoadingSkeleton; 