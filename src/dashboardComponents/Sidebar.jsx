import React, { useState,useEffect } from "react";
import { socketRef } from "../features/socket.js";
import {
  LayoutDashboard,
  MessageSquare,
  ListTodo,
  Users,
  Settings,
  Trash2,
  MoreVertical,
  Plus
} from "lucide-react"; // Add the Plus icon import
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent, setSelectedEvent, setSelectedEventName } from "../features/eventSlice.js";
import EventForm from "../forms/EventForm.jsx";

function Sidebar({ events = [], userid }) {
  const selectedEventId = useSelector((state) => state.eventReducer.selectedEventId);
  const dispatch = useDispatch();
  const [showEventForm, setShowEventForm] = useState(false);

  const handleEventClick = (eventId, eventname) => {
    dispatch(setSelectedEvent(eventId));
    dispatch(setSelectedEventName(eventname));
  };

  

  // Using useEffect to log when selectedEventId changes
  useEffect(() => {
    if (selectedEventId) {
      console.log("Selected Event ID:", selectedEventId);
    }
  }, [selectedEventId]); // Runs only when selectedEventId changes

    const handleEventDelete = (eventid) => {
      socketRef.emit("event:delete" , {eventid : eventid});
      const handleDelete = (eventid) => {dispatch(deleteEvent(eventid))}
      socketRef.on("event:deleted", handleDelete )
      console.log("Delete task with id:", eventid);
    };

    const handleAddClick = () =>{
        setShowEventForm(true);
    }

    console.log(events)

  return (<>
    <div className="w-64 bg-white border-r flex flex-col justify-between overflow-y-auto no-scrollbar">
      <div className="p-6">
        <h1 className="text-xl font-bold text-purple-600 mb-8">Project M.</h1>
        <nav className="space-y-4 text-gray-700 text-sm">
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <LayoutDashboard className="h-5 w-5" /> Home
          </div>
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <MessageSquare className="h-5 w-5" /> Messages
          </div>
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <ListTodo className="h-5 w-5" /> Tasks
          </div>
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <Users className="h-5 w-5" /> Members
          </div>
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <Settings className="h-5 w-5" /> Settings
          </div>
        </nav>

        <hr className="my-6" />

        <div className="flex justify-between items-center mb-2">
          <div className="text-xs font-semibold text-gray-500">MY PROJECTS</div>
          <button className="text-gray-500 hover:text-purple-600" onClick={()=>handleAddClick()}>
            <Plus size={16} />
          </button>
        </div>

        <div className="space-y-2 text-sm max-h-56 overflow-y-auto pr-1 custom-scrollbar no-scrollbar">
          {events.map((event, index) => (
            <div
              key={event._id || index}
              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
            >
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                {event.eventname}
              </div>
              <div className="flex gap-2 items-center text-gray-500">
                <button className="hover:text-red-500" onClick={() => handleEventDelete(event.eventid)}>
                  <Trash2 size={16} />
                </button>
                <button
                  className="hover:text-gray-700"
                  onClick={() => handleEventClick(event.eventid, event.eventname)}
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-yellow-50 m-4 rounded-xl text-center text-sm text-gray-700">
        <div className="text-yellow-400 text-2xl mb-2">💡</div>
        <p className="font-medium">Thoughts Time</p>
        <p className="text-xs mt-1 mb-2">
          We don’t have any notice for you, till then you can share your thoughts with your peers.
        </p>
        <button className="text-white bg-purple-600 px-3 py-1 rounded-md text-xs">
          Write a message
        </button>
      </div>
    </div>
  {showEventForm && <EventForm onClose = {() => {setShowEventForm(false)}}userid = {userid}/>}
</>
  );
}

export default Sidebar;
