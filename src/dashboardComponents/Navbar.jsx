import React from "react";
import {
  Bell,
  Calendar,
  HelpCircle,
  LogOut,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
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
    <div className="flex items-center justify-between p-4 border-b bg-white relative overflow-hidden">
      {/* Enhanced animated background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-indigo-50 via-transparent to-cyan-50 opacity-30 animate-pulse"></div>

      {/* Flowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2 left-0 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-6 right-0 w-12 h-12 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-full opacity-15 animate-float-medium"></div>
        <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-10 animate-float-fast"></div>
      </div>

      {/* Floating sparkle icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles
          className="absolute top-3 left-20 text-blue-300 opacity-60 animate-sparkle"
          size={16}
          style={{ animationDelay: "0s" }}
        />
        <Star
          className="absolute top-8 left-60 text-purple-300 opacity-50 animate-sparkle"
          size={12}
          style={{ animationDelay: "1s" }}
        />
        <Zap
          className="absolute bottom-3 left-40 text-pink-300 opacity-40 animate-sparkle"
          size={14}
          style={{ animationDelay: "2s" }}
        />
        <Sparkles
          className="absolute top-4 right-32 text-indigo-300 opacity-45 animate-sparkle"
          size={10}
          style={{ animationDelay: "1.5s" }}
        />
        <Star
          className="absolute bottom-6 right-60 text-violet-300 opacity-35 animate-sparkle"
          size={16}
          style={{ animationDelay: "0.8s" }}
        />
      </div>

      {/* Enhanced moving wave effects */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-wave-top"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent animate-wave-bottom"></div>

      {/* Side flowing lines */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-200 to-transparent animate-flow-vertical"></div>
      <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-pink-200 to-transparent animate-flow-vertical-reverse"></div>

      {/* Central content area with subtle glow */}
      <div className="flex items-center justify-center flex-1 relative z-10">
        <div className="text-center group cursor-default">
          <div className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-text">
            ✨ TaskFlow Dashboard ✨
          </div>
          <div className="text-xs text-gray-500 mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            Manage your productivity with style
          </div>
          {/* Animated underline */}
          <div className="h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mt-2 animate-expand-contract rounded-full"></div>
        </div>
      </div>

      {/* User section (keeping your original styling) */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="flex items-center gap-2 group">
          <div className="text-sm text-right transform transition-all duration-500 hover:scale-105">
            <div className="font-medium relative">
              {username}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12 active:scale-95"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-5px) translateX(-5px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) translateX(15px) rotate(270deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-12px) translateX(-8px) rotate(120deg);
          }
          66% {
            transform: translateY(-8px) translateX(12px) rotate(240deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          20% {
            transform: translateY(-10px) translateX(8px) rotate(72deg);
          }
          40% {
            transform: translateY(-15px) translateX(-6px) rotate(144deg);
          }
          60% {
            transform: translateY(-5px) translateX(10px) rotate(216deg);
          }
          80% {
            transform: translateY(-18px) translateX(-4px) rotate(288deg);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes wave-top {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%);
            opacity: 0;
          }
        }

        @keyframes wave-bottom {
          0% {
            transform: translateX(200%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes flow-vertical {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }

        @keyframes flow-vertical-reverse {
          0% {
            transform: translateY(200%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        @keyframes gradient-text {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes expand-contract {
          0%,
          100% {
            width: 20%;
            opacity: 0.3;
          }
          50% {
            width: 80%;
            opacity: 1;
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }

        .animate-wave-top {
          animation: wave-top 5s linear infinite;
        }

        .animate-wave-bottom {
          animation: wave-bottom 6s linear infinite;
        }

        .animate-flow-vertical {
          animation: flow-vertical 4s linear infinite;
        }

        .animate-flow-vertical-reverse {
          animation: flow-vertical-reverse 5s linear infinite;
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 4s ease infinite;
        }

        .animate-expand-contract {
          animation: expand-contract 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Navbar;
