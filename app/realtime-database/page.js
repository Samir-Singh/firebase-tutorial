const RealTimeDatabase = () => {
  return (
    <div>
      <h1 className="text-xl font-medium my-3">
        Created a simple todo app for understanding realtime database
      </h1>

      <input
        type="text"
        className="border px-2 rounded-sm"
        placeholder="Enter here"
      />

      <button className="border bg-gray-300 px-2 rounded-sm cursor-pointer ml-2">
        Submit
      </button>
    </div>
  );
};

export default RealTimeDatabase;
