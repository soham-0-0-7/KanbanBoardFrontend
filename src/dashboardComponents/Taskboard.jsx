import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { socketRef } from "../features/socket.js";
import {
  deleteTask,
  setSelectedTask,
  setSelectedTaskName,
  syncTask,
  updateTaskStatus,
} from "../features/taskSlice.js";
import { Trash2, MoreVertical, Plus } from "lucide-react";
import SubtaskDialog from "./SubtaskDialog.jsx";
import TaskForm from "../forms/TaskForm.jsx";

const priorityColors = {
  low: "text-orange-500",
  medium: "text-blue-500",
  high: "text-red-500",
};

const Task = ({ task, onDeleteTask, onOpenSubtasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { taskid: task.taskid, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-xl shadow-md space-y-2 border border-gray-200 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full border ${
            priorityColors[task.priority]
          } border-current bg-gray-50`}
        >
          {task.priority}
        </span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full`}>
          due : {new Date(task.duedate).toLocaleDateString()}
        </span>
      </div>
      <h3 className="font-semibold text-gray-800 text-sm">{task.taskname}</h3>
      <p className="text-xs text-gray-500 leading-snug">{task.description}</p>
      <div className="flex justify-between items-center text-xs text-gray-400 pt-2 border-t border-gray-100">
        {/* <div>
          <span className="font-medium text-gray-500">👥 Users</span>
        </div>
        <div className="flex gap-2">
          <span>💬 0</span>
          <span>📎 0</span>
        </div> */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onDeleteTask(task.taskid)}
            className="hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
          <button
            className="hover:text-gray-700"
            onClick={() => onOpenSubtasks(task.taskname, task.taskid)}
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskColumn = ({
  title,
  tasks,
  status,
  onTaskDrop,
  handleAddClick,
  priority,
  onDeleteTask,
  onOpenSubtasks,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onTaskDrop(item.taskid, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bg-gray-100 p-4 rounded-lg w-80 flex-shrink-0 max-h-[600px] flex flex-col ${
        isOver ? "bg-purple-100" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
          <button
            className="text-gray-500 hover:text-purple-600"
            onClick={() => handleAddClick(title)}
          >
            <Plus size={16} />
          </button>
        </div>
        <span className="text-sm bg-gray-300 px-2 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div
        className="space-y-4 overflow-y-auto pr-2 no-scrollbar"
        style={{ flex: 1 }}
      >
        {tasks.length === 0 ? (
          <p className="text-xs text-gray-500">No tasks here</p>
        ) : (
          tasks
            .filter((task) => priority === "" || task.priority === priority)
            .map((task) => (
              <Task
                key={task.taskid}
                task={task}
                onDeleteTask={onDeleteTask}
                onOpenSubtasks={onOpenSubtasks}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default function Taskboard() {
  const dispatch = useDispatch();
  const selectedEventId = useSelector(
    (state) => state.eventReducer.selectedEvent
  );
  const selectedEventName = useSelector(
    (state) => state.eventReducer.selectedEventName
  );
  const todotasks = useSelector((state) => state.taskReducer.todotasks);
  const onprogresstasks = useSelector(
    (state) => state.taskReducer.onprogresstasks
  );
  const donetasks = useSelector((state) => state.taskReducer.donetasks);

  const [showSubTasks, setShowSubtasks] = useState(false);
  const [showTodoTaskForm, setShowTodoTaskForm] = useState(false);
  const [showOnProgressTaskForm, setShowOnProgressTaskForm] = useState(false);
  const [showDoneTaskForm, setShowDoneTaskForm] = useState(false);
  const [priority, setPriority] = useState("");

  useEffect(() => {
    if (selectedEventId) {
      socketRef.emit("task:getAll", { eventid: selectedEventId });
      socketRef.on("task:list", (taskList) => {
        dispatch(syncTask({ tasks: taskList }));
      });
    }
  }, [selectedEventId, dispatch]);

  const handleTaskDrop = (taskid, newStatus) => {
    socketRef.emit("task:updateStatus", { taskid, status: newStatus });
    dispatch(updateTaskStatus({ taskid, status: newStatus }));
  };

  const handleAddClick = (title) => {
    if (title === "To Do") {
      setShowTodoTaskForm(true);
    } else if (title === "On Progress") {
      setShowOnProgressTaskForm(true);
    } else if (title === "Done") {
      setShowDoneTaskForm(true);
    }
  };

  const handleFilter = (priority) => {
    setPriority(priority);
  };

  const handleDeleteTask = (taskid) => {
    socketRef.emit("task:delete", { taskid });
    const handleTaskDeleted = (taskid) => {
      dispatch(deleteTask(taskid));
    };
    socketRef.on("task:deleted", handleTaskDeleted);
    return () => {
      socketRef.off("task:deleted", handleTaskDeleted);
    };
  };

  const handleOpenSubtasks = (taskname, taskid) => {
    dispatch(setSelectedTask(taskid));
    dispatch(setSelectedTaskName(taskname));
    setShowSubtasks(true);
  };

  return (
    <>
      {selectedEventId && (
        <div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-2xl border-2 border-red-500 text-red-600 hover:bg-red-100 transition duration-200 shadow-sm"
              onClick={() => handleFilter("high")}
            >
              Filter: High Priority
            </button>
            <button
              className="px-4 py-2 rounded-2xl border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-100 transition duration-200 shadow-sm"
              onClick={() => handleFilter("medium")}
            >
              Filter: Medium Priority
            </button>
            <button
              className="px-4 py-2 rounded-2xl border-2 border-green-500 text-green-600 hover:bg-green-100 transition duration-200 shadow-sm"
              onClick={() => handleFilter("low")}
            >
              Filter: Low Priority
            </button>
            <button
              className="px-4 py-2 rounded-2xl border-2 border-gray-500 text-gray-600 hover:bg-gray-100 transition duration-200 shadow-sm"
              onClick={() => handleFilter("")}
            >
              Clear Filter
            </button>
          </div>
          <h1 className="text-5xl m-5 p-5">{selectedEventName}</h1>
          <div className="flex gap-6 p-6 overflow-x-auto">
            <TaskColumn
              title="To Do"
              tasks={todotasks}
              status="todo"
              onTaskDrop={handleTaskDrop}
              handleAddClick={handleAddClick}
              priority={priority}
              onDeleteTask={handleDeleteTask}
              onOpenSubtasks={handleOpenSubtasks}
            />
            <TaskColumn
              title="On Progress"
              tasks={onprogresstasks}
              status="on progress"
              onTaskDrop={handleTaskDrop}
              handleAddClick={handleAddClick}
              priority={priority}
              onDeleteTask={handleDeleteTask}
              onOpenSubtasks={handleOpenSubtasks}
            />
            <TaskColumn
              title="Done"
              tasks={donetasks}
              status="done"
              onTaskDrop={handleTaskDrop}
              handleAddClick={handleAddClick}
              priority={priority}
              onDeleteTask={handleDeleteTask}
              onOpenSubtasks={handleOpenSubtasks}
            />
          </div>
        </div>
      )}
      {showSubTasks && <SubtaskDialog onClose={() => setShowSubtasks(false)} />}
      {showTodoTaskForm && (
        <TaskForm onClose={() => setShowTodoTaskForm(false)} status="todo" />
      )}
      {showOnProgressTaskForm && (
        <TaskForm
          onClose={() => setShowOnProgressTaskForm(false)}
          status="on progress"
        />
      )}
      {showDoneTaskForm && (
        <TaskForm onClose={() => setShowDoneTaskForm(false)} status="done" />
      )}
    </>
  );
}
