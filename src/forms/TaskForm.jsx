import React, { useState } from "react";
import { X } from "lucide-react";
import Errorpopup from "../components/Errorpopup"; // Adjust path if necessary
import { socketRef } from "../features/socket";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/taskSlice";

function TaskForm({ onClose,status }) {
  const [taskname, setTaskname] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const eventid = useSelector((state) => state.eventReducer.selectedEvent);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskname.trim() || !description.trim() || !duedate) {
      setError("All fields are required.");
      return;
    }

    const formattedDueDate = new Date(duedate).toISOString();

    socketRef.emit("task:create",{taskname:taskname, description:description, priority:priority, duedate:formattedDueDate, status:status, eventid:eventid });
    // socketRef.on("task:created", (task)=>{
    //     dispatch(addTask({taskid:task.taskid, taskname:task.taskname, description:task.description, priority:task.priority, duedate:task.duedate, status:task.status, eventid:eventid}));
    // })

    console.log("Task Name:", taskname);
    console.log("Description:", description);
    console.log("Due Date:", duedate);
    console.log("Priority:", priority);
    onClose();
    // return () => {
    //           socketRef.off("task:created", handleSubmit);
    //         };
  };


  return (
    <>
      {error && <Errorpopup message={error} onClose={() => setError("")} />}
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md" style={{ backgroundColor: "rgba(255,255,255,0.3)" }}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
          <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500" onClick={onClose}>
            <X size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-4">Create Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Task Name"
              value={taskname}
              onChange={(e) => setTaskname(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={3}
            />
            <input
              type="date"
              value={duedate}
              onChange={(e) => setDuedate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TaskForm;
