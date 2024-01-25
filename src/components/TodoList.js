import React, { useState, useEffect } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../api/api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editId, setEditId] = useState(null);

  const getAllTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  useEffect(() => {
    let todoLocal = JSON.parse(localStorage.getItem("todos"));
    getAllTodos();
    setTodos(todoLocal);
  }, []);

  const createHandler = async () => {
    if (newTodo.trim() !== "") {
      try {
        const res = await createTodo({ text: newTodo, completed: false });
        const { id, text, completed } = res.data;
        setTodos((prevTodos) => [...prevTodos, { id, text, completed }]);
        setNewTodo("");
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  };

  const updateTodoItem = (id, updateFN) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? updateFN(todo) : todo
      );
      updateTodo(
        id,
        updatedTodos.find((todo) => todo.id === id)
      );
      return updatedTodos;
    });
  };
  // Mark Completed
  const markCompletedHandler = (id) => {
    updateTodoItem(id, (todo) => ({ ...todo, completed: !todo.completed }));
  };
  // Edit Todo
  const editHandler = (id) => {
    if (editTodo.trim() === "") return;
    updateTodoItem(id, (todo) => ({ ...todo, text: editTodo }));
  };

  const clearEditTodo = () => {
    setEditTodo((prev) => "");
  };

  const setEditingTodoId = (id) => {
    setEditId(id);
  };

  const deleteHandler = (id) => {
    deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    // 在這裡儲存資料，當 todos 更新時就會觸發
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const actionHandlers = {
    deleteAction: deleteHandler,
    markCompleted: markCompletedHandler,
    editHandler: editHandler,
    setEditingTodoId: setEditingTodoId,
    clearEditTodo: clearEditTodo,
  };

  return (
    <div className="max-w-[640px] mx-auto py-10">
      <h1 className="text-2xl font-black mb-6 pl-4">Todo List</h1>
      <div className="flex gap-4 justify-center p-4">
        <div className="relative flex-1" data-te-input-wrapper-init>
          <input
            type="text"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput1"
            placeholder="請輸入"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <label
            htmlFor="exampleFormControlInput1"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            請輸入
          </label>
        </div>
        <Button handler={createHandler} text="Add Task" />
      </div>
      <ul className="p-4">
        {[...todos].reverse().map((todo) => (
          <li
            key={todo.id}
            className="flex items-center w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50"
          >
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id={todo.id}
                checked={todo.completed}
                onChange={() => markCompletedHandler(todo.id)}
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor={todo.id}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </label>
            </div>
            <Dropdown actionHandlers={actionHandlers} info={todo} />
          </li>
        ))}
      </ul>
      <Modal
        actionHandlers={actionHandlers}
        editId={editId}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
    </div>
  );
};

export default TodoList;
