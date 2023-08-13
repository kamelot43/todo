import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialogEdit = (
  {
    open,
    onClose = () => {},
    onChange = () => {},
    todo: {item: {title = '', description = '', id = ''}}
  }) => {

  const [inputTitle, setTitle] = useState(title);
  const [inputDescription, setDescription] = useState(description);

  const handleChangeTitle = (value) => {
    setTitle(value);
  };

  const handleChangeDescription = (value) => {
    setDescription(value);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="title"
            label="Todo Title"
            variant="outlined"
            fullWidth
            type="text"
            onChange={(e) => handleChangeTitle(e.target.value)}
            value={inputTitle}
          />
          <TextField
            id="description"
            label="Todo Description"
            variant="outlined"
            fullWidth
            style={{ margin: "5px 0" }}
            type="text"
            onChange={(e) => handleChangeDescription(e.target.value)}
            value={inputDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            onChange(id, {todo: {title: inputTitle, description: inputDescription}})
            onClose();
          }}
          >Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogEdit;
