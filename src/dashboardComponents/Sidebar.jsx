import React, { useState, useEffect } from "react";
import { socketRef } from "../features/socket.js";
import { Trash2, MoreVertical, Plus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteEvent,
  setSelectedEvent,
  setSelectedEventName,
} from "../features/eventSlice.js";
import EventForm from "../forms/EventForm.jsx";

function Sidebar({ events = [], userid }) {
  const selectedEventId = useSelector(
    (state) => state.eventReducer.selectedEventId
  );
  const dispatch = useDispatch();
  const [showEventForm, setShowEventForm] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null);

  const handleEventClick = (eventId, eventname) => {
    dispatch(setSelectedEvent(eventId));
    dispatch(setSelectedEventName(eventname));
  };

  useEffect(() => {
    if (selectedEventId) {
      console.log("Selected Event ID:", selectedEventId);
    }
  }, [selectedEventId]);

  const handleEventDelete = (eventid) => {
    setDeletingEventId(eventid);
    setTimeout(() => {
      socketRef.emit("event:delete", { eventid: eventid });
      const handleDelete = (eventid) => {
        dispatch(deleteEvent(eventid));
      };
      socketRef.on("event:deleted", handleDelete);
      console.log("Delete task with id:", eventid);
      setDeletingEventId(null);
    }, 300);
  };

  const handleAddClick = () => {
    setShowEventForm(true);
  };

  console.log(events);

  return (
    <>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translateY(0);
          }
          40%,
          43% {
            transform: translateY(-8px);
          }
          70% {
            transform: translateY(-4px);
          }
          90% {
            transform: translateY(-2px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }

        @keyframes slideOut {
          to {
            transform: translateX(-100%);
            opacity: 0;
            height: 0;
            margin: 0;
            padding: 0;
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(168, 85, 247, 0.4);
          }
          50% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.8),
              0 0 30px rgba(168, 85, 247, 0.6);
          }
        }

        .sidebar-container {
          animation: slideInLeft 0.6s ease-out;
        }

        .project-header {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .add-button {
          transition: all 0.3s ease;
        }

        .add-button:hover {
          animation: bounce 1s infinite;
          color: #a855f7;
          transform: scale(1.1);
        }

        .event-item {
          animation: fadeInUp 0.5s ease-out both;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .event-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s;
        }

        .event-item:hover::before {
          left: 100%;
        }

        .event-item:hover {
          transform: translateX(8px) scale(1.02);
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .event-item.selected {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
          color: white;
          animation: glow 2s infinite;
        }

        .event-item.selected .event-name {
          color: white;
        }

        .event-item.deleting {
          animation: slideOut 0.3s ease-in forwards;
        }

        .status-dot {
          animation: pulse 2s infinite;
          transition: all 0.3s ease;
        }

        .event-item:hover .status-dot {
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
        }

        .event-item.selected .status-dot {
          background-color: #22c55e;
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.8);
        }

        .action-button {
          transition: all 0.2s ease;
          opacity: 0.7;
        }

        .action-button:hover {
          transform: scale(1.2) rotate(5deg);
          opacity: 1;
        }

        .delete-button:hover {
          color: #ef4444;
          transform: scale(1.2) rotate(-5deg);
        }

        .more-button:hover {
          color: #374151;
          transform: scale(1.2) rotate(90deg);
        }

        .event-name {
          transition: all 0.3s ease;
        }

        .scrollbar-area {
          position: relative;
        }

        .scrollbar-area::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(to bottom, white, transparent);
          z-index: 1;
          pointer-events: none;
        }

        .scrollbar-area::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(to top, white, transparent);
          z-index: 1;
          pointer-events: none;
        }

        .projects-section {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(-0.5deg);
          }
          75% {
            transform: translateY(-8px) rotate(0.5deg);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: scaleY(0.5);
          }
          50% {
            transform: scaleY(1);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        .floating-shapes {
          position: relative;
          height: 100px;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }

        .shape-1 {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #a855f7, #3b82f6);
          top: 20px;
          left: 20px;
          animation: float 6s ease-in-out infinite;
        }

        .shape-2 {
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #10b981, #06b6d4);
          top: 60px;
          right: 30px;
          animation: float 4s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 25px;
          height: 25px;
          background: linear-gradient(45deg, #f59e0b, #ef4444);
          top: 10px;
          right: 80px;
          animation: float 5s ease-in-out infinite;
          animation-delay: -2s;
        }

        .orbit-container {
          position: relative;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .orbit-center {
          width: 8px;
          height: 8px;
          background: #a855f7;
          border-radius: 50%;
          position: relative;
        }

        .orbit-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #06b6d4;
          border-radius: 50%;
          animation: orbit 8s linear infinite;
        }

        .orbit-dot:nth-child(2) {
          animation-delay: -2s;
          background: #10b981;
        }

        .orbit-dot:nth-child(3) {
          animation-delay: -4s;
          background: #f59e0b;
        }

        .orbit-dot:nth-child(4) {
          animation-delay: -6s;
          background: #ef4444;
        }

        .wave-container {
          height: 80px;
          display: flex;
          align-items: end;
          justify-content: center;
          gap: 4px;
          padding: 20px 0;
        }

        .wave-bar {
          width: 3px;
          background: linear-gradient(to top, #a855f7, #06b6d4);
          border-radius: 2px;
          animation: wave 2s ease-in-out infinite;
          opacity: 0.6;
        }

        .wave-bar:nth-child(1) {
          height: 20px;
          animation-delay: 0s;
        }
        .wave-bar:nth-child(2) {
          height: 30px;
          animation-delay: 0.1s;
        }
        .wave-bar:nth-child(3) {
          height: 25px;
          animation-delay: 0.2s;
        }
        .wave-bar:nth-child(4) {
          height: 35px;
          animation-delay: 0.3s;
        }
        .wave-bar:nth-child(5) {
          height: 20px;
          animation-delay: 0.4s;
        }
        .wave-bar:nth-child(6) {
          height: 28px;
          animation-delay: 0.5s;
        }
        .wave-bar:nth-child(7) {
          height: 32px;
          animation-delay: 0.6s;
        }
        .wave-bar:nth-child(8) {
          height: 22px;
          animation-delay: 0.7s;
        }

        .sparkles-container {
          position: relative;
          height: 100px;
          overflow: hidden;
        }

        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #a855f7;
          border-radius: 50%;
          animation: sparkle 3s ease-in-out infinite;
        }

        .sparkle:nth-child(1) {
          top: 20px;
          left: 30px;
          animation-delay: 0s;
          background: #06b6d4;
        }

        .sparkle:nth-child(2) {
          top: 60px;
          left: 100px;
          animation-delay: 0.5s;
          background: #10b981;
        }

        .sparkle:nth-child(3) {
          top: 40px;
          left: 160px;
          animation-delay: 1s;
          background: #f59e0b;
        }

        .sparkle:nth-child(4) {
          top: 80px;
          left: 60px;
          animation-delay: 1.5s;
          background: #ef4444;
        }

        .sparkle:nth-child(5) {
          top: 10px;
          left: 130px;
          animation-delay: 2s;
          background: #8b5cf6;
        }

        .inspirational-text {
          text-align: center;
          padding: 20px;
          color: #6b7280;
          font-size: 12px;
          line-height: 1.5;
          animation: fadeInUp 1s ease-out 1s both;
        }

        .inspirational-text .highlight {
          color: #a855f7;
          font-weight: 600;
        }

        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        .breathing-circle {
          width: 60px;
          height: 60px;
          border: 2px solid #a855f7;
          border-radius: 50%;
          margin: 20px auto;
          animation: breathe 4s ease-in-out infinite;
          opacity: 0.3;
        }
      `}</style>

      <div className="w-64 bg-white border-r flex flex-col justify-between overflow-y-auto no-scrollbar sidebar-container">
        <div className="p-6">
          <h1 className="text-xl font-bold text-purple-600 mb-8 project-header">
            Project M.
          </h1>

          <nav className="space-y-4 text-gray-700 text-sm">
            {/* Navigation items commented out but replaced with floating shapes animation */}
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>

            <div className="orbit-container">
              <div className="orbit-center">
                <div className="orbit-dot"></div>
                <div className="orbit-dot"></div>
                <div className="orbit-dot"></div>
                <div className="orbit-dot"></div>
              </div>
            </div>
          </nav>

          <hr className="my-6" />

          <div className="projects-section">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xs font-semibold text-gray-500">
                MY PROJECTS
              </div>
              <button
                className="text-gray-500 hover:text-purple-600 add-button"
                onClick={() => handleAddClick()}
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-3 text-sm max-h-56 overflow-y-auto pr-1 no-scrollbar scrollbar-area">
              {events.map((event, index) => (
                <div
                  key={event._id || index}
                  className={`event-item flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer ${
                    selectedEventId === event.eventid
                      ? "selected"
                      : "bg-gray-50"
                  } ${deletingEventId === event.eventid ? "deleting" : ""}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                  onMouseEnter={() => setHoveredEventId(event.eventid)}
                  onMouseLeave={() => setHoveredEventId(null)}
                >
                  <div className="flex items-center gap-3">
                    <span className="status-dot h-3 w-3 rounded-full bg-green-500"></span>
                    <span className="event-name text-gray-800 font-medium truncate">
                      {event.eventname}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      className="action-button delete-button text-gray-400 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventDelete(event.eventid);
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                    <button
                      className="action-button more-button text-gray-400 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event.eventid, event.eventname);
                      }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section filled with beautiful animations */}
        <div className="p-4">
          <div className="wave-container">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>

          <div className="breathing-circle"></div>

          <div className="sparkles-container">
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
          </div>

          <div className="inspirational-text">
            <p>
              ✨ <span className="highlight">Create</span> something amazing
            </p>
            <p>
              Every project starts with an{" "}
              <span className="highlight">idea</span>
            </p>
          </div>
        </div>
      </div>

      {showEventForm && (
        <EventForm
          onClose={() => {
            setShowEventForm(false);
          }}
          userid={userid}
        />
      )}
    </>
  );
}

export default Sidebar;
