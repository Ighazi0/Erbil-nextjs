import { Box, Grid, Paper, Skeleton } from '@mui/material';

const LoadingSkeleton = () => (
    <Paper elevation={3} className="p-4 mb-4">
        <Box className="mb-4">
            <Skeleton variant="rectangular" width={300} height={40} />
        </Box>
        <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} md={6} key={item}>
                    <Skeleton variant="rectangular" height={56} />
                </Grid>
            ))}
            <Grid item xs={12}>
                <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12}>
                <Skeleton variant="rectangular" height={120} />
            </Grid>
        </Grid>
    </Paper>
);

export default LoadingSkeleton; 