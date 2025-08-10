import React, { useState } from "react";
import { X } from "lucide-react";
import Errorpopup from "../components/Errorpopup"; // Adjust path as needed
import {  useSelector } from "react-redux";
import { socketRef } from "../features/socket";
// import {  } from "../features/subtaskSlice";
function SubtaskForm({ onClose }) {
  const [subtaskname, setSubtaskname] = useState("");
  const [error, setError] = useState("");
  const taskid = useSelector((state) => state.taskReducer.selectedTask)
  // const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subtaskname.trim()) {
      setError("Subtask name is required.");
      return;
    }

    socketRef.emit("subtask:create", {name : subtaskname, taskid:taskid});
    // socketRef.on("subtask:created",(subtask)=>{
    //   console.log("Subtask Created:", subtask);
    //   dispatch(addSubtask({id: subtask.id,name:subtask.name, taskid:taskid}));
    // })

    console.log("Subtask Name:", subtaskname);
    
    onClose();
    // return () => {
    //       socketRef.off("subtask:created", handleSubmit);
    //     };
  };

  return (
    <>
      {error && <Errorpopup message={error} onClose={() => setError("")} />}
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md" style={{ backgroundColor: "rgba(255,255,255,0.3)" }}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
          <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500" onClick={onClose}>
            <X size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-4">Create Subtask</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Subtask Name"
              value={subtaskname}
              onChange={(e) => setSubtaskname(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Create Subtask
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SubtaskForm;
