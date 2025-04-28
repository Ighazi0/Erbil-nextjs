import { Box, Paper, Skeleton, Grid } from '@mui/material';

const CarDetailsSkeleton = () => {
    return (
        <Box className="p-3 p-md-4 w-100 min-vh-100 bg-light">
            {/* Header Section */}
            <Paper className="mb-4 p-4 bg-white shadow" sx={{ borderRadius: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Skeleton variant="rectangular" width={250} height={36} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 2 }} />
                </Box>
            </Paper>

            {/* Search and Filters Section */}
            <Paper className="mb-4 p-4" sx={{ borderRadius: 3 }}>
                <Box sx={{ mb: 2 }}>
                    <Skeleton variant="text" width={200} height={32} />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Skeleton variant="rectangular" width={300} height={40} sx={{ borderRadius: 2 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
                        <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
                    </Box>
                </Box>
            </Paper>

            {/* Content Section */}
            <Paper sx={{ borderRadius: 3, p: 3 }}>
                <Grid container spacing={3}>
                    {/* First Row */}
                    {[...Array(4)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={`row1-${index}`}>
                            <Box>
                                <Skeleton variant="text" width={100} height={24} sx={{ mb: 1 }} />
                                <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1 }} />
                            </Box>
                        </Grid>
                    ))}

                    {/* Second Row */}
                    {[...Array(4)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={`row2-${index}`}>
                            <Box>
                                <Skeleton variant="text" width={100} height={24} sx={{ mb: 1 }} />
                                <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1 }} />
                            </Box>
                        </Grid>
                    ))}

                    {/* Third Row */}
                    {[...Array(4)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={`row3-${index}`}>
                            <Box>
                                <Skeleton variant="text" width={100} height={24} sx={{ mb: 1 }} />
                                <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 1 }} />
                            </Box>
                        </Grid>
                    ))}

                    {/* Features Section */}
                    <Grid item xs={12}>
                        <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            {[...Array(8)].map((_, index) => (
                                <Grid item xs={12} sm={6} md={3} key={`feature-${index}`}>
                                    <Skeleton variant="rectangular" height={32} sx={{ borderRadius: 1 }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Images Section */}
                    <Grid item xs={12}>
                        <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2, mb: 2 }} />
                        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
                            {[...Array(5)].map((_, index) => (
                                <Skeleton 
                                    key={`thumb-${index}`}
                                    variant="rectangular" 
                                    width={100} 
                                    height={100} 
                                    sx={{ borderRadius: 1, flexShrink: 0 }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CarDetailsSkeleton; 