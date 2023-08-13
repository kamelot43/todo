import React, { useState, useEffect, useCallback } from 'react';
// MUI
import { TextField, Button } from '@mui/material';
//Immer
import {produce} from "immer";
// Components
import Todo from "./components/Todo";
import FormDialogEdit from "./components/FormDialogEdit";
// Firebase
import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
// Styles
import './App.css';
// Others
const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));


export default () => {
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({
        item: doc.data()
      })))
    })
  }, [inputTitle, inputDescription]);

  const addTodo = (e) => {
    e.preventDefault();
    addDoc(collection(db, "todos"), {
      id: "todo_" + Math.random(),
      title: inputTitle,
      description: inputDescription,
      timestamp: serverTimestamp(),
      done: false,
      focus: false
    });
    setInputTitle("");
    setInputDescription("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = useCallback((id) => {
    setTodos(
      produce((draft) => {
        const todo = draft.find((todo) => todo.item.id === id);
        todo.item.focus = !todo.item.focus;
      })
    );
  }, []);

  const handleChange = useCallback((id, {todo: {title, description}}) => {
    setTodos(
      produce((draft) => {
        const todo = draft.find((todo) => todo.item.id === id);
        todo.item.title = title;
        todo.item.description = description;
      })
    );
    const updateTodo = async () => {
      try {
        const todoDocument = doc(db, "todos", 'gwrdreO9LhfBECb4josR');
        await updateDoc(todoDocument, {
          todos: todos
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
    updateTodo();
  }, []);

  const focusTodo = () => {
    return todos.filter((todo) => {
      return todo?.item.focus === true;
    })[0] || null
  };

  const currentTodo = focusTodo();

  return (
    <div className="App">
      <h2>Todo List App</h2>
      <form>
        <TextField
          id="outlined-basic"
          label="Todo Title"
          variant="outlined"
          style={{ margin: "0px 5px" }}
          size="small"
          value={inputTitle}
          onChange={e => setInputTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Todo Description"
          variant="outlined"
          style={{ margin: "0px 5px" }}
          size="small"
          value={inputDescription}
          onChange={e => setInputDescription(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTodo} >Add Todo</Button>
      </form>
      <div className="todos__container">
        {todos.map(item =>
          <Todo
            key={Math.random()}
            arr={item}
            onEdit={(id) => {
              handleClickOpen();
              handleToggle(id);
            }}
          />
        )}
      </div>
      {currentTodo &&
        <FormDialogEdit
          open={open}
          onClose={handleClose}
          onChange={handleChange}
          todo={currentTodo}
        />
      }
    </div>
  );
};
