import React from 'react';
//
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
//
import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
import './Todo.css';

const Todo = ({ arr, onEdit = () => {} }) => {
  return (
    <>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={arr.item?.title} secondary={arr.item?.description} />
        </ListItem>
        <EditIcon
          fontSize="medium"
          style={{ opacity: 0.7 }}
          onClick={() => onEdit(arr?.item.id)}
        />
        <DeleteIcon
          fontSize="medium"
          style={{ opacity: 0.7 }}
          onClick={() => {
            deleteDoc(doc(db, "todos", arr.id));
          }}
        />
      </List>
    </>
  )
};

export default Todo;
