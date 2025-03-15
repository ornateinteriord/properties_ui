import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
  } from "@mui/material";
  
  interface DeleteConfirmationDialogProps {
    open: boolean; // Controls whether the dialog is open
    onClose: () => void; // Callback when the dialog is closed
    onDelete: () => void; // Callback when the delete action is confirmed
  }
  
  const DeleteConfirmationDialog = ({
    open,
    onClose,
    onDelete,
  }: DeleteConfirmationDialogProps) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        {/* Dialog Title */}
        <DialogTitle>Delete Property</DialogTitle>
  
        {/* Dialog Content */}
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this property?
          </Typography>
        </DialogContent>
  
        {/* Dialog Actions (Buttons) */}
        <DialogActions sx={{ justifyContent: "flex-end", gap: 2, p: 2 }}>
          {/* Cancel Button */}
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
  
          {/* Delete Button */}
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DeleteConfirmationDialog;