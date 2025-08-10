import { createSlice } from "@reduxjs/toolkit";
// import { socketRef } from "./socket.js";

const initialSubtaskState = {
  subtasks: [],
};

export const subtaskSlice = createSlice({
  name: "subtasks",
  initialState: initialSubtaskState,
  reducers: {
    addSubtask: (state, action) => {
      const s = {
        subtaskid: action.payload.subtaskid,
        name: action.payload.name,
        taskid: action.payload.taskid,
      };

      state.subtasks.push(s);
    },

    deleteSubtask: (state, action) => {
      state.subtasks = state.subtasks.filter(
        (subtask) => subtask.subtaskid !== action.payload.subtaskid
      );
    },

    syncSubtask: (state, action) => {
      state.subtasks = action.payload.subtasks; // Assuming subtasks are passed in the payload
    },

    clearSubtasks: (state) => {
      state.subtasks = [];
    },
  },
});

export const { addSubtask, deleteSubtask, syncSubtask, clearSubtasks } =
  subtaskSlice.actions;
export default subtaskSlice.reducer;
