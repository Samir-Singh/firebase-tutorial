"use client";

import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Home() {
  const [name, setName] = useState("");
  const { putData } = useGlobalContext();

  const pushUser = () => {
    putData(`users/${name}`, { id: Date.now(), name });
    setName("");
  };

  return (
    <div>
      <h1>Firebase Tutorial</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e?.target?.value)}
        placeholder="Enter Name"
        className="border mr-2 p-2"
      />

      <button disabled={!name} className="border py-1 px-2" onClick={pushUser}>
        Push Data
      </button>
    </div>
  );
}
