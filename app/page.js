"use client";

import { useState } from "react";
import { useFirebase } from "@/context/FirebaseProvider";

export default function Home() {
  const { putData } = useFirebase();
  const [name, setName] = useState("");

  const pushUser = () => {
    putData(`users/${name}`, { id: Date.now(), name });
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

      <button className="border py-1 px-2" onClick={pushUser}>
        Push Data
      </button>
    </div>
  );
}
