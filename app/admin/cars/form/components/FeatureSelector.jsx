import React from 'react';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Typography,
    Paper,
    Grid,
    FormGroup,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

const defaultFeatures = {
    safety: [
        'AC_Front',
        'Central_Locking',
        'Leather',
        'Sports_Package',
        'Navigation_System'
    ],
    exterior: [
        'Front_Fog_Light',
        'Rain_Sensing_Wipe',
        'Rear_Spoilers',
        'Sun_Roof',
    ],
    interior: [
        'AC_Front',
        'Child_Safety_Locks',
        'Leather',
        'Driver_Air_Bags'
    ],
    convenience: [
        'Power_Steering',
        'Vanity_Mirror',
        'Trunk_Light'
    ]
};

const FeatureSelector = ({ value = {}, onChange }) => {
    const handleFeatureChange = (category, feature) => {
        const currentCategoryFeatures = value[category] || [];
        const newCategoryFeatures = currentCategoryFeatures.includes(feature)
            ? currentCategoryFeatures.filter(f => f !== feature)
            : [...currentCategoryFeatures, feature];

        onChange({
            ...value,
            [category]: newCategoryFeatures
        });
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {Object.entries(defaultFeatures).map(([category, features]) => (
                    <Grid item xs={12} md={6} key={category}>
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', textTransform: 'capitalize' }}>
                                <FormattedMessage id={category} defaultMessage={category} />
                            </Typography>
                            <FormGroup>
                                {features.map((feature) => (
                                    <FormControlLabel
                                        key={feature}
                                        control={
                                            <Checkbox
                                                checked={(value[category] || []).includes(feature)}
                                                onChange={() => handleFeatureChange(category, feature)}
                                            />
                                        }
                                        label={<FormattedMessage id={feature} defaultMessage={feature.replace(/_/g, ' ')} />}
                                    />
                                ))}
                            </FormGroup>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FeatureSelector; 