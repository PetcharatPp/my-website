import Counter from "./components/Counter";
import Task from "./components/Task";
import Egg from "./components/Egg";
import Sidebar from "./components/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Food from "./components/food";
import PlannerLocal from "./components/PlannerLocal";
import React from "react";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-pink-50 via-blue-50 to-mint-50 font-[Kanit]">
        {/* 🌸 Header */}
        <header className="bg-gradient-to-r from-pink-200 via-lilac-200 to-mint-200 text-pink-800 shadow-md backdrop-blur-md p-4 sticky top-0 z-10">
          <h1 className="text-xl md:text-2xl text-center font-semibold tracking-wide drop-shadow-sm">
            🌈 Planner App
          </h1>
        </header>

        {/* 🧭 Content */}
        <div className="flex flex-1 justify-center">
          {/* 🩵 Main Content */}
          <main className="flex-1 max-w-md p-6 bg-white/80 shadow-xl rounded-2xl my-6 mx-auto backdrop-blur-lg border border-pink-100">
            <PlannerLocal />
          </main>
        </div>

        {/* 💖 Footer */}
        <footer className="bg-gradient-to-r from-lilac-100 via-pink-100 to-mint-100 text-gray-700 p-4 text-center rounded-t-2xl shadow-inner border-t border-pink-200">
          <p className="font-medium text-sm md:text-base">
            Made with 💖 by  65110469,65110632
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
