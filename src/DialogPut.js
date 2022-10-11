import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const  FormDialog =  ({open, onChange, onHandleChange, cancel, update})=>{
  return (
    <>
      <Dialog open={open} fullWidth>
        <DialogTitle>Cập nhập</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            value={onChange}
            onChange ={onHandleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} sx={{textTransform: 'none'}}>Hủy</Button>
          <Button onClick={update} sx={{textTransform: 'none'}}>Cập nhập</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default FormDialog