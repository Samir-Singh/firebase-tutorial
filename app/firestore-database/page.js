"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useState } from "react";

const FireStoreDatabase = () => {
  const [collectionName, setCollectionName] = useState("");
  const [formData, setFormData] = useState({
    collection: "",
    name: "",
    age: "",
    isAdmin: false,
  });
  const { firestore } = useGlobalContext();

  const handleAddData = async () => {
    const result = await firestore.handleAddData(formData.collection, {
      name: formData.name,
      age: Number(formData.age),
      isAdmin: formData.isAdmin,
    });

    if (result.success) {
      setFormData({ collection: "", name: "", age: "", isAdmin: false });
      alert("Document added with ID: " + result.data.id);
    } else {
      alert("Error adding document: " + result.error.message);
    }
  };

  const handleReadData = async () => {
    const result = await firestore.handleReadData(collectionName);
    if (result.success) {
      console.log("Documents in collection:", collectionName);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-medium my-3">Adding Data into FireStore</h1>
      <p>
        Add Document in{" "}
        <input
          type="text"
          value={formData.collection}
          className="border px-2 rounded-sm"
          placeholder="Enter collection name"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, collection: e.target.value }))
          }
        />{" "}
        collection
      </p>
      <input
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        className="border px-2 rounded-sm mt-3"
        placeholder="Enter name"
        type="text"
      />
      <input
        value={formData.age}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, age: e.target.value }))
        }
        className="border px-2 rounded-sm mt-3"
        placeholder="Enter age"
        type="number"
      />
      <span>
        Is Admin ?{" "}
        <label onClick={() => setFormData({ ...formData, isAdmin: true })}>
          <input
            onChange={() => setFormData({ ...formData, isAdmin: true })}
            type="radio"
            value="Yes"
            checked={formData?.isAdmin === true}
          />
          Yes
        </label>
        <label onClick={() => setFormData({ ...formData, isAdmin: false })}>
          <input
            onChange={() => setFormData({ ...formData, isAdmin: false })}
            type="radio"
            value="No"
            checked={formData?.isAdmin === false}
          />
          No
        </label>
      </span>
      <button
        onClick={handleAddData}
        className="border bg-gray-300 px-2 rounded-sm cursor-pointer"
      >
        Add Collection
      </button>

      <hr className="my-5" />
      <h1 className="text-xl font-medium">Read Data from FireStore</h1>
      <input
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        className="border px-2 rounded-sm mt-3"
        placeholder="Enter collection name"
      />
      <button
        onClick={handleReadData}
        className="border bg-gray-300 px-2 rounded-sm cursor-pointer"
      >
        Read Data
      </button>
    </div>
  );
};

export default FireStoreDatabase;
