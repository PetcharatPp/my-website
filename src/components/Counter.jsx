import { useState } from "react";

export default function Counter()
{
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl mb-4">
        จำนวน : {count}
      </h1>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-600 text-black px-4">
        เพิ่ม
      </button>
    </div>
  );
}
