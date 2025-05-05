import React from "react";
import { Bell, Calendar, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearEvents } from "../features/eventSlice";
import { clearSubtasks } from "../features/subtaskSlice";
import { clearTasks } from "../features/taskSlice";
import { useDispatch } from "react-redux";

function Navbar({ username }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearEvents());
    dispatch(clearSubtasks());
    dispatch(clearTasks());
    dispatch({ type: "RESET_STORE" });
    navigate("/");
  };
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <input
        type="text"
        placeholder="Search for anything..."
        className="w-1/3 px-4 py-2 border rounded-md text-sm bg-gray-100"
      />
      <div className="flex items-center gap-4">
        <Calendar className="text-gray-500" />
        <HelpCircle className="text-gray-500" />
        <Bell className="text-gray-500" />
        <div className="flex items-center gap-2">
          <div className="text-sm text-right">
            <div className="font-medium">{username}</div>
            <div className="text-xs text-gray-500">Rajasthan, India</div>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
