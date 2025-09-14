"use client";

import { app } from "./firebase";
import { getDatabase, ref, set } from "firebase/database";

export default function Home() {
  const db = getDatabase(app);

  const pushUser = () => {
    console.log("data pushed");
    set(ref(db, "users/john"), {
      id: 1,
      firstName: "John",
      lastName: "Doe",
    });
  };

  return (
    <div>
      <h1>Firebase Tutorial</h1>

      <button className="border py-1 px-2" onClick={pushUser}>
        Push Data
      </button>
    </div>
  );
}
