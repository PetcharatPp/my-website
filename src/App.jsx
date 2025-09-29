import Counter from "./components/Counter";
import Task from "./components/Task";
import Egg from "./components/Egg";
import Sidebar from "./components/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

  return (
     <BrowserRouter>
   <div className="min-h-screen w-screen flex flex-col">
      {/* ชื่อ Application */}
      <header className="bg-black text-red-200 p-4" >
        <h1 className="text-l text-center ">SixPack</h1>
        </header>
           
      <div className="flex flex-1">
        {/* หน้าจอหลัก */}
        <Sidebar/> 
        <main className="flex-1 p-6 bg-black ">
        <Routes>
        <Route path="1" element={<Egg />} />
        <Route path="2" element={<Task />} />
        </Routes>  

        {/* <Task></Task> */}
        {/* <Egg></Egg> */}
        </main>
      </div>
      <footer className="bg-red-300 text-black p-4 text-center">Made by ANT DPU 2025 Copyright</footer>
    </div>
    </BrowserRouter>
  )
}