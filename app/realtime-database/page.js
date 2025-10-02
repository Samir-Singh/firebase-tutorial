"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const RealTimeDatabase = () => {
  const [isEdit, setIsEdit] = useState(null);
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const { realTimeDatabase } = useGlobalContext();
  const prevTodosRef = useRef([]);

  const handleAddTodo = () => {
    realTimeDatabase
      .handleAddRealTimeData(`todos/${Date.now()}`, {
        id: Date.now(),
        text: value,
        completed: false,
      })
      .then((_) => setValue(""))
      .catch((err) => alert(err));
  };

  const handleDeleteTodo = (id) => {
    realTimeDatabase.handleDeleteRealTimeData(`todos/${id}`);
  };

  const handleToggleTodo = (id) => {
    const filteredTodo = todos?.find((item) => item?.id === id);
    realTimeDatabase.handleUpdateRealTimeData(`todos/${id}`, {
      ...filteredTodo,
      completed: !filteredTodo?.completed,
    });
  };

  const handleUpdateTodo = (id) => {
    const filteredTodo = todos?.find((item) => item?.id === id);
    realTimeDatabase
      .handleUpdateRealTimeData(`todos/${id}`, {
        ...filteredTodo,
        text: value,
      })
      .then(() => {
        setValue("");
        setIsEdit(null);
      });
  };

  useEffect(() => {
    const unsubscribe = realTimeDatabase.handleReadRealTimeData(
      "todos",
      (newTodos) => {
        // Compare with previous state
        const prevTodos = prevTodosRef.current;

        if (prevTodos.length > 0) {
          // Detect Add
          if (newTodos.length > prevTodos.length) {
            const added = newTodos.find(
              (item) => !prevTodos.some((p) => p.id === item.id)
            );
            if (added) toast.success(`Added: ${added.text}`);
          }

          // Detect Delete
          if (newTodos.length < prevTodos.length) {
            const removed = prevTodos.find(
              (item) => !newTodos.some((n) => n.id === item.id)
            );
            if (removed) toast.error(`Deleted: ${removed.text}`);
          }

          // Detect Update/Toggle
          newTodos.forEach((item) => {
            const prev = prevTodos.find((p) => p.id === item.id);
            if (prev) {
              if (prev.text !== item.text) {
                toast.success(`Updated: ${item.text}`);
              }
              if (prev.completed !== item.completed) {
                toast.success(
                  `${item.text} marked as ${
                    item.completed ? "Completed ✅" : "Incomplete ❌"
                  }`
                );
              }
            }
          });
        }

        // Update states
        setTodos(newTodos);
        prevTodosRef.current = newTodos;
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-medium my-3">
        Created a simple todo app for understanding realtime database
      </h1>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
        className="border px-2 rounded-sm"
        placeholder="Enter here"
      />

      <button
        onClick={() => (isEdit ? handleUpdateTodo(isEdit) : handleAddTodo())}
        className="border bg-gray-300 px-2 rounded-sm cursor-pointer ml-2"
      >
        {isEdit ? "Update" : "Submit"}
      </button>

      <ul className="mt-5 w-2xs">
        {todos?.map((item) => (
          <li
            className="bg-amber-200 mt-3 p-3 rounded-xl text-xl flex items-center justify-between"
            key={item.id}
          >
            <span className="inline-flex gap-3 items-center">
              <input
                checked={item?.completed === true}
                onChange={() => handleToggleTodo(item?.id)}
                type="checkbox"
                className="w-4 h-4"
              />
              <span className={`${item?.completed ? "line-through" : ""}`}>
                {item?.text}
              </span>
            </span>
            <span className="inline-flex gap-3">
              <button
                onClick={() => {
                  setIsEdit(item.id);
                  setValue(item?.text);
                }}
                className="cursor-pointer"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDeleteTodo(item.id)}
                className="cursor-pointer"
              >
                ❌
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeDatabase;
