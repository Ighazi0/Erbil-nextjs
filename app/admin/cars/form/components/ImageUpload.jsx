import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Paper, Typography, Grid, IconButton, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageUpload = React.memo(({ 
    handleImageChange, 
    uploadProgress, 
    imagePreviews, 
    removeImage 
}) => (
    <Paper 
        elevation={2} 
        className="p-4" 
        sx={{ 
            backgroundColor: '#fafafa',
            border: '2px dashed #e0e0e0',
            borderRadius: 2,
            transition: 'all 0.3s ease'
        }}
    >
        <div className="text-center mb-4">
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
            />
            <label htmlFor="image-upload">
                <Box sx={styles.uploadBox}>
                    <CloudUploadIcon sx={styles.uploadIcon} />
                    <Typography variant="h6" color="primary" gutterBottom>
                        <FormattedMessage id="dropImages" defaultMessage="Drop images here" />
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <FormattedMessage id="orClickToUpload" defaultMessage="or click to upload" />
                    </Typography>
                </Box>
            </label>
        </div>

        {uploadProgress && (
            <Box className="text-center my-3">
                <CircularProgress size={24} />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <FormattedMessage id="uploadingImages" defaultMessage="Uploading images..." />
                </Typography>
            </Box>
        )}

        <ImagePreviewGrid imagePreviews={imagePreviews} removeImage={removeImage} />
    </Paper>
));

const ImagePreviewGrid = React.memo(({ imagePreviews, removeImage }) => (
    <Grid container spacing={2} className="mt-3">
        {imagePreviews.map((preview, index) => (
            <ImagePreviewItem 
                key={`preview-${index}`} 
                preview={preview} 
                index={index} 
                onRemove={removeImage} 
            />
        ))}
    </Grid>
));

const ImagePreviewItem = React.memo(({ preview, index, onRemove }) => (
    <Grid item xs={12} sm={6} md={4}>
        <Paper 
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 3,
                '&:hover': {
                    '& .image-overlay': {
                        opacity: 1
                    }
                }
            }}
        >
            <Box
                component="img"
                src={preview}
                alt={`Preview ${index + 1}`}
                sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)'
                    }
                }}
            />
            <Box
                className="image-overlay"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    zIndex: 1
                }}
            >
                <IconButton
                    onClick={() => onRemove(index)}
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Paper>
    </Grid>
));

const styles = {
    uploadBox: {
        cursor: 'pointer',
        py: 3,
        px: 2,
        border: '1px dashed',
        borderColor: 'primary.main',
        borderRadius: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }
    },
    uploadIcon: {
        fontSize: 48,
        color: 'primary.main',
        mb: 1
    },
    previewPaper: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 3,
        '&:hover': {
            '& .image-overlay': {
                opacity: 1
            }
        }
    },
    previewImage: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
        display: 'block',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transition: 'all 0.3s ease',
        zIndex: 1
    },
    deleteButton: {
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
        }
    }
};

ImageUpload.displayName = 'ImageUpload';
ImagePreviewGrid.displayName = 'ImagePreviewGrid';
ImagePreviewItem.displayName = 'ImagePreviewItem';

export default ImageUpload; 