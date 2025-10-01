"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useState } from "react";

const FireStoreDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [fireStoreData, setFireStoreData] = useState([]);
  const [updatingRow, setUpdatingRow] = useState({
    id: "",
    name: "",
    age: "",
    admin: "",
  });
  const [formData, setFormData] = useState({
    collection: "",
    name: "",
    age: "",
    admin: false,
  });
  const { firestore } = useGlobalContext();

  const handleAddData = () => {
    firestore
      .handleAddData(formData.collection, {
        name: formData.name,
        age: Number(formData.age),
        admin: formData.admin,
      })
      .then((result) => {
        console.log("iuytfghjk", result);
        setFormData({ collection: "", name: "", age: "", admin: false });
        alert("Document added with ID: " + result.data.id);
      })
      .catch((error) => {
        alert("Error adding document: " + error.message);
      });

    // if (result.success) {
    //   setFormData({ collection: "", name: "", age: "", admin: false });
    //   alert("Document added with ID: " + result.data.id);
    // } else {
    //   alert("Error adding document: " + result.error.message);
    // }
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

  const handleUpdateData = async () => {
    const result = await firestore.handleUpdateData(
      collectionName,
      updatingRow?.id,
      {
        name: updatingRow?.name,
        age: updatingRow?.age,
        admin: updatingRow?.admin,
      }
    );

    if (result.success) {
      alert("Data updated successfully");
      setUpdatingRow({ id: "", name: "", age: "", admin: "" });
      handleReadData();
    } else {
      alert("Error while updating the data " + result.error.message);
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
        <label onClick={() => setFormData({ ...formData, admin: true })}>
          <input
            onChange={() => setFormData({ ...formData, admin: true })}
            type="radio"
            value="Yes"
            checked={formData?.admin === true}
          />
          Yes
        </label>
        <label onClick={() => setFormData({ ...formData, admin: false })}>
          <input
            onChange={() => setFormData({ ...formData, admin: false })}
            type="radio"
            value="No"
            checked={formData?.admin === false}
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
                <td className="px-5">
                  {user?.id === updatingRow?.id ? (
                    <input
                      value={updatingRow.name}
                      onChange={(e) =>
                        setUpdatingRow((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="border px-2 rounded-sm"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="px-5">
                  {user?.id === updatingRow?.id ? (
                    <input
                      value={updatingRow.age}
                      onChange={(e) =>
                        setUpdatingRow((prev) => ({
                          ...prev,
                          age: e.target.value,
                        }))
                      }
                      className="border px-2 rounded-sm"
                    />
                  ) : (
                    user.age
                  )}
                </td>
                <td className="px-5">
                  {user?.id === updatingRow?.id ? (
                    <>
                      <label
                        onClick={() =>
                          setUpdatingRow((prev) => ({ ...prev, admin: true }))
                        }
                      >
                        <input
                          onChange={() =>
                            setUpdatingRow((prev) => ({
                              ...prev,
                              admin: true,
                            }))
                          }
                          type="radio"
                          value="Yes"
                          checked={updatingRow?.admin === true}
                        />
                        Yes
                      </label>
                      <label
                        onClick={() =>
                          setUpdatingRow((prev) => ({
                            ...prev,
                            admin: false,
                          }))
                        }
                      >
                        <input
                          onChange={() =>
                            setUpdatingRow((prev) => ({
                              ...prev,
                              admin: false,
                            }))
                          }
                          type="radio"
                          value="No"
                          checked={updatingRow?.admin === false}
                        />
                        No
                      </label>
                    </>
                  ) : user.admin ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="px-5">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => handleDeleteData(collectionName, user.id)}
                      className="border bg-gray-300 px-2 rounded-sm cursor-pointer"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        if (updatingRow?.id) {
                          handleUpdateData();
                        } else {
                          setUpdatingRow({
                            id: user.id,
                            name: user.name,
                            age: user.age,
                            admin: user.admin,
                          });
                        }
                      }}
                      className="border bg-gray-300 px-2 rounded-sm cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
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
