"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useState } from "react";

const FireStoreDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [fireStoreData, setFireStoreData] = useState([]);
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
      admin: formData.isAdmin,
    });

    if (result.success) {
      setFormData({ collection: "", name: "", age: "", isAdmin: false });
      alert("Document added with ID: " + result.data.id);
    } else {
      alert("Error adding document: " + result.error.message);
    }
  };

  const handleReadData = async () => {
    setLoading(true);
    const result = await firestore.handleReadData(collectionName);
    if (result.success) {
      setFireStoreData(result.data);
    } else {
      alert("Error reading document: " + result.error.message);
      setFireStoreData([]);
    }
    setLoading(false);
  };

  const handleDeleteData = async (name, id) => {
    const result = await firestore.handleDeleteData(name, id);
    if (result.success) {
      alert("Data deleted successfully");
      handleReadData();
    } else {
      alert("Error while deleting the data " + result.error.message);
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
      <table className="mt-5 border">
        <thead>
          <tr>
            <th align="left" className="px-5">
              Id
            </th>
            <th align="left" className="px-5">
              Name
            </th>
            <th align="left" className="px-5">
              Age
            </th>
            <th align="left" className="px-5">
              Admin
            </th>
            <th align="left" className="px-5">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          ) : (
            fireStoreData?.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-5">{user.id}</td>
                <td className="px-5">{user.name}</td>
                <td className="px-5">{user.age}</td>
                <td className="px-5">{user.isAdmin ? "Yes" : "No"}</td>
                <td className="px-5">
                  <button
                    onClick={() => handleDeleteData(collectionName, user.id)}
                    className="border bg-gray-300 px-2 rounded-sm cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FireStoreDatabase;
