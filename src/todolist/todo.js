import React, { useState } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../todolist/todo.css';

const todoSlice = createSlice({
  name: "todos",
  initialState: { items: [] },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo({ id: Date.now(), text: newTodo }));
      setNewTodo("");
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="bgBox">
        <div className="mainCard">
            <h1>To-Do List </h1>

            <div className="inputBox">
              <label> Enter Your Name : <br/>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)} 
              />
              </label>
              <button type="button" onClick={handleAddTodo} className="addBtn">Add Todo</button>

              <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <div className="text">
                  {todo.text}
                  
                  <button type="button" class="btn btn-danger" onClick={() => handleRemoveTodo(todo.id)}>remove</button>
                  </div>
                </li>
              ))}
              
            </ul>
            </div>
          </div>
    </div>
  );
};

const List = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default List;
