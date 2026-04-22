import Counter from "./components/Counter";
import Task from "./components/Task";
import Egg from "./components/Egg";
import Sidebar from "./components/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Food from "./components/food";
import PlannerLocal from "./components/PlannerLocal";
import React from "react";
import { useState } from "react";

const initialData = {
  rope: [
    { id: 1, name: "Red Rope 4mm", qty: 1 },
    { id: 2, name: "Blue Rope 4mm", qty: 15 },
  ],
  pendant: [
    { id: 101, name: "Pendant #101", qty: 3 },
    { id: 102, name: "Pendant #102", qty: 6 },
  ],
  bell: [
    { id: 201, name: "Bell Red S", qty: 8 },
    { id: 202, name: "Bell Gold M", qty: 12 },
  ],
};

export default function App() {
  const [data, setData] = useState(initialData);

  const updateQty = (category, id, delta) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
      ),
    }));
  };

  const getStatus = (category, qty) => {
    if (category === "rope" && qty <= 1) return "low";
    if (category === "pendant" && qty <= 4) return "low";
    if (category === "bell" && qty <= 10) return "low";
    return "normal";
  };

  const Card = ({ item, category }) => {
    const status = getStatus(category, item.qty);

    return (
      <div
        className={`rounded-2xl p-4 shadow-sm border flex justify-between items-center transition ${
          status === "low" ? "border-red-300 bg-red-50" : "bg-white"
        }`}
      >
        <div>
          <div className="font-semibold text-gray-800">{item.name}</div>
          <div className="text-sm text-gray-500 mt-1">
            Qty: <span className="font-medium">{item.qty}</span>
          </div>
          {status === "low" && (
            <div className="text-xs text-red-500 mt-1">Low Stock</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQty(category, item.id, -1)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            -
          </button>
          <button
            onClick={() => updateQty(category, item.id, 1)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            +
          </button>
          <button
            onClick={() => updateQty(category, item.id, -1)}
            className="px-3 py-1 rounded-xl bg-red-500 text-white text-sm shadow"
          >
            เบิก
          </button>
        </div>
      </div>
    );
  };

  const Section = ({ title, category }) => (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-700 mb-3">{title}</h2>
      <div className="space-y-3">
        {data[category].map((item) => (
          <Card key={item.id} item={item} category={category} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Inventory Dashboard
        </h1>
        <p className="text-gray-500 text-sm">จัดการสต๊อกสินค้า</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-gray-500">Rope</div>
          <div className="text-xl font-bold">{data.rope.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-gray-500">Pendant</div>
          <div className="text-xl font-bold">{data.pendant.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-gray-500">Bell</div>
          <div className="text-xl font-bold">{data.bell.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-red-200">
          <div className="text-sm text-red-400">Low Stock</div>
          <div className="text-xl font-bold text-red-500">
            {Object.values(data)
              .flat()
              .filter((item, i, arr) => {
                const cat =
                  i < data.rope.length
                    ? "rope"
                    : i < data.rope.length + data.pendant.length
                    ? "pendant"
                    : "bell";
                return getStatus(cat, item.qty) === "low";
              }).length}
          </div>
        </div>
      </div>

      {/* Sections */}
      <Section title="Rope" category="rope" />
      <Section title="Pendant" category="pendant" />
      <Section title="Bell" category="bell" />
    </div>
  );
}
