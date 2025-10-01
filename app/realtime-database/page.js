"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useEffect, useState } from "react";

const RealTimeDatabase = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const { realTimeDatabase } = useGlobalContext();

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

  useEffect(() => {
    const unsubscribe = realTimeDatabase.handleReadRealTimeData(
      "todos",
      setTodos
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
        onClick={handleAddTodo}
        className="border bg-gray-300 px-2 rounded-sm cursor-pointer ml-2"
      >
        Submit
      </button>

      <ul className="mt-5 w-2xs">
        {todos?.map((item) => (
          <li
            className="bg-amber-200 mt-3 p-3 rounded-xl text-xl flex items-center justify-between"
            key={item.id}
          >
            <span>{item?.text}</span>
            <span className="inline-flex gap-3">
              <button className="cursor-pointer">✏️</button>
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
