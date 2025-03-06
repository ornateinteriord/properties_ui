import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    IconButton,
    Grid,
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close'; 

const CreateProperty = ({ open, onClose }:{open:any,onClose:any}) => {

    const handleSubmit = (event:any) => {
        event.preventDefault();
        // Handle form submission here
        onClose();
      };
  return (
    <Dialog
    open={open}
    onClose={onClose}
    maxWidth="md" // Increased maxWidth for wider dialog
    fullWidth
    PaperProps={{
      sx: {
        borderRadius: 3, // Rounded corners for the dialog
        padding: 2, // Padding inside the dialog
      },
    }}
  >
<DialogTitle sx={{ width:{xs:"100%"},display: 'flex', justifyContent:"space-between", alignItems: 'center' }}>
      Create  Property
      <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
        <CloseIcon /> {/* Close icon in the top-right corner */}
      </IconButton>
    </DialogTitle>

    <DialogContent>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={1}> {/* Grid layout for better organization */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              margin="normal"
              required
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              margin="normal"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Super Area (sqft)"
              margin="normal"
              type="number"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Furnishing"
              margin="normal"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bathrooms"
              margin="normal"
              type="number"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              margin="normal"
              type="number"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price per sqft"
              margin="normal"
              type="number"
              required
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
    </DialogContent>

    <DialogActions sx={{ padding: 3 }}>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#150b83c1',
          width: '110px',
          borderRadius: '30px',
          color: '#fff',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#150b83',
          },
        }}
      >
        Create
      </Button>
    </DialogActions>
  </Dialog>
);
}

export default CreateProperty
