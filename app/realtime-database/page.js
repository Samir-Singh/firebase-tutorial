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

  useEffect(() => {
    realTimeDatabase.handleReadRealTimeData("todos", setTodos);
  }, []);

  console.log("oiuytfghjk", todos);

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
            className="bg-amber-200 mt-3 p-3 rounded-xl text-xl"
            key={item.id}
          >
            {item?.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeDatabase;
