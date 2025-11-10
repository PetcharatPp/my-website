import React from "react";
import PlannerLocal from "./PlannerLocal";

export default function Planner() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#fffaf6 0%,#fdf6ff 60%,#f9fcff 100%)",
      }}
    >
      <PlannerLocal />
    </div>
  );
}
