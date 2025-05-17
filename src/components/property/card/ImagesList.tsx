import { Box, IconButton, Typography } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";

interface ImagesListProps {
  images: string[];
  handleRemoveImage ?: (index: number) => void;
  handleDeleteImage ?: (url: string) => void;
  title?: string;
  deleteByIndex?: boolean; // Add this new prop
}

const ImagesList = ({ 
  images, 
  handleDeleteImage, 
  handleRemoveImage,
  title = "Uploaded Images",
  deleteByIndex = false 
}: ImagesListProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
        {title} :
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {images.map((url, index) => (
          <Box key={url} sx={{ position: 'relative' }}>
            <img
              src={url}
              alt={`Uploaded ${index}`}
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 4
              }}
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                }
              }}
              onClick={() => deleteByIndex ? handleRemoveImage!(index) : handleDeleteImage!(url)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImagesList