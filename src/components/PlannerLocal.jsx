import React, { useState, useEffect, useCallback } from "react";
import CalendarView from "./CalendarView";
import "./PlannerLocal.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PlannerLocal() {
  const [tab, setTab] = useState("planner");
  const [theme, setTheme] = useState("pink");
  const [data, setData] = useState({
    habits: [],
    tasks: [],
    mood: "😊",
    finance: { income: 0, expense: 0 },
    notes: "",
    diary: {},
    calendarNotes: {},
  });

  const [pin, setPin] = useState(localStorage.getItem("diary-pin") || "");
  const [inputPin, setInputPin] = useState("");
  const [isUnlocked, setUnlocked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const saved = localStorage.getItem("planner-mobile");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("planner-mobile", JSON.stringify(data));
  }, [data]);

  // รีเซ็ต Planner
  const resetPlanner = () => {
    if (window.confirm("🧹 รีเซ็ตข้อมูล Planner หรือไม่?")) {
      setData({
        ...data,
        habits: [],
        tasks: [],
        mood: "😊",
        finance: { income: 0, expense: 0 },
        notes: "",
      });
    }
  };

  // ตั้งรหัสใหม่
  const setNewPin = () => {
    if (pin) {
      const oldPin = prompt("🔐 กรุณาใส่รหัสเดิมก่อน:");
      if (oldPin !== pin) {
        alert("❌ รหัสเดิมไม่ถูกต้อง!");
        return;
      }
    }
    const newPin = prompt("🔑 ตั้งรหัสใหม่ (4 หลัก):");
    if (newPin && /^\d{4}$/.test(newPin)) {
      localStorage.setItem("diary-pin", newPin);
      setPin(newPin);
      alert("✅ ตั้งรหัสใหม่สำเร็จ!");
    } else {
      alert("⚠️ กรุณาใส่รหัสตัวเลข 4 หลัก");
    }
  };

  // ตรวจสอบรหัส
  const checkPin = () => {
    if (inputPin === pin) setUnlocked(true);
    else alert("❌ รหัสไม่ถูกต้อง!");
  };

  // ล้างบันทึก
  const clearDiary = () => {
    const dateKey = selectedDate || new Date().toISOString().split("T")[0];
    if (window.confirm("🧹 ต้องการล้างบันทึกของวันนี้หรือไม่?")) {
      const newDiary = { ...data.diary };
      delete newDiary[dateKey];
      setData({ ...data, diary: newDiary });
    }
  };

  const themes = ["pink", "mint", "lilac", "peach", "rainbow"];

  return (
    <div className={`planner-container theme-${theme}`}>
      <header className="planner-header">
        <h1>🌈 My Planner</h1>
        <div className="theme-selector">
          {themes.map((t) => (
            <button
              key={t}
              className={`theme-btn ${theme === t ? "active" : ""}`}
              onClick={() => setTheme(t)}
            >
              <div className={`color-preview ${t}`}></div>
            </button>
          ))}
        </div>

        <div className="tab-buttons">
          <button
            className={tab === "planner" ? "active" : ""}
            onClick={() => setTab("planner")}
          >
            🗒 Planner
          </button>
          <button
            className={tab === "diary" ? "active" : ""}
            onClick={() => setTab("diary")}
          >
            📔 Diary
          </button>
          <button
            className={tab === "horoscope" ? "active" : ""}
            onClick={() => setTab("horoscope")}
          >
            🔮 Horoscope
          </button>
        </div>
      </header>

      {/* ✅ Planner */}
      {tab === "planner" && (
        <div className="planner-scroll">
          <PlannerPage data={data} setData={setData} resetPlanner={resetPlanner} />
        </div>
      )}

      {/* ✅ Diary */}
      {tab === "diary" && (
        <div className="planner-scroll">
          {!pin ? (
            <div className="card">
              <h3>🔒 ตั้งรหัสครั้งแรก</h3>
              <button className="btn pop" onClick={setNewPin}>
                ➕ ตั้งรหัส 4 หลัก
              </button>
            </div>
          ) : !isUnlocked ? (
            <div className="card diary-lock">
              <h3>🔐 ปลดล็อกไดอารี่</h3>
              <input
                type="password"
                className="input"
                maxLength={4}
                placeholder="ใส่รหัส 4 หลัก"
                value={inputPin}
                onChange={(e) => setInputPin(e.target.value)}
              />
              <button className="btn pop" onClick={checkPin}>
                ✅ เข้าสู่ไดอารี่
              </button>
            </div>
          ) : (
            <DiaryPage
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              data={data}
              setData={setData}
              clearDiary={clearDiary}
              setNewPin={setNewPin}
            />
          )}
        </div>
      )}

      {/* ✅ Horoscope */}
      {tab === "horoscope" && (
        <div className="planner-scroll">
          <section className="card">
            <h3>🔮 ดูดวงวันนี้</h3>
            <Horoscope />
          </section>
        </div>
      )}
    </div>
  );
}

/* ✅ Planner Page */
function PlannerPage({ data, setData, resetPlanner }) {
  return (
    <>
      <section className="card">
        <h3>🌼 Habits</h3>
        <AddInline
          placeholder="เพิ่มนิสัยใหม่..."
          onAdd={(txt) =>
            setData({
              ...data,
              habits: [...data.habits, { id: Date.now(), name: txt, done: false }],
            })
          }
        />
        {data.habits.map((h) => (
          <div key={h.id} className="habit-line">
            <label className={`habit ${h.done ? "done" : ""}`}>
              <input
                type="checkbox"
                checked={h.done}
                onChange={() =>
                  setData({
                    ...data,
                    habits: data.habits.map((x) =>
                      x.id === h.id ? { ...x, done: !x.done } : x
                    ),
                  })
                }
              />
              <span>{h.name}</span>
            </label>
            <button
              className="delete-btn"
              onClick={() =>
                setData({
                  ...data,
                  habits: data.habits.filter((x) => x.id !== h.id),
                })
              }
            >
              🗑
            </button>
          </div>
        ))}
      </section>

      <section className="card">
        <h3>🗓 Mini Calendar</h3>
        <p className="note">แตะเลือกวัน เขียนโน้ต และเลือกอิโมจิได้เลย 💖</p>
        <CalendarView
          notes={data.calendarNotes}
          onSave={(newNotes) => setData({ ...data, calendarNotes: newNotes })}
        />
      </section>

      <div className="reset-container">
        <button className="reset-btn-bottom" onClick={resetPlanner}>
          🧹 รีเซ็ตข้อมูล Planner
        </button>
      </div>
    </>
  );
}

/* ✅ Diary Page */
function DiaryPage({ selectedDate, setSelectedDate, data, setData, clearDiary, setNewPin }) {
  const moodValue = { "🤩": 5, "😊": 4, "😐": 3, "😔": 2, "😭": 1 };
  const diaryData = data.diary[selectedDate] || {};

  const chartData = Object.keys(data.diary || {})
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => ({
      date: date.slice(5),
      mood: moodValue[data.diary[date]?.mood] || null,
    }))
    .filter((d) => d.mood);

  return (
    <div className="card diary-content">
      <h3>📔 บันทึกประจำวัน</h3>

      <input
        type="date"
        className="input"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <div className="mood-select">
        <p>อารมณ์วันนี้:</p>
        {["🤩", "😊", "😐", "😔", "😭"].map((mood) => (
          <button
            key={mood}
            className={`mood-btn ${diaryData.mood === mood ? "active" : ""}`}
            onClick={() =>
              setData({
                ...data,
                diary: {
                  ...data.diary,
                  [selectedDate]: { ...diaryData, mood },
                },
              })
            }
          >
            {mood}
          </button>
        ))}
      </div>

      <textarea
        className="input"
        rows={6}
        placeholder="เขียนเรื่องราวของวันนี้..."
        value={diaryData.text || ""}
        onChange={(e) =>
          setData({
            ...data,
            diary: {
              ...data.diary,
              [selectedDate]: { ...diaryData, text: e.target.value },
            },
          })
        }
      />

      <div className="diary-btns">
        <button className="btn" onClick={setNewPin}>
          🔁 เปลี่ยนรหัส
        </button>
        <button className="btn reset-finance-btn" onClick={clearDiary}>
          🧹 ล้างบันทึกวันนี้
        </button>
      </div>

      <div className="chart-wrapper">
        <h4>📈 กราฟอารมณ์</h4>
        {chartData.length === 0 ? (
          <p className="empty">ยังไม่มีข้อมูลอารมณ์ 💭</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#ffb3c6"
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

/* ✅ Horoscope */
function Horoscope() {
  const [sign, setSign] = useState(localStorage.getItem("zodiac") || "");
  const [topic, setTopic] = useState("love");
  const [horoscope, setHoroscope] = useState("");
  const [luck, setLuck] = useState(null);

  const zodiacList = [
    { name: "เมษ ♈", date: "21 มี.ค. - 19 เม.ย." },
    { name: "พฤษภ ♉", date: "20 เม.ย. - 20 พ.ค." },
    { name: "เมถุน ♊", date: "21 พ.ค. - 20 มิ.ย." },
    { name: "กรกฎ ♋", date: "21 มิ.ย. - 22 ก.ค." },
    { name: "สิงห์ ♌", date: "23 ก.ค. - 22 ส.ค." },
    { name: "กันย์ ♍", date: "23 ส.ค. - 22 ก.ย." },
    { name: "ตุล ♎", date: "23 ก.ย. - 22 ต.ค." },
    { name: "พิจิก ♏", date: "23 ต.ค. - 21 พ.ย." },
    { name: "ธนู ♐", date: "22 พ.ย. - 21 ธ.ค." },
    { name: "มังกร ♑", date: "22 ธ.ค. - 19 ม.ค." },
    { name: "กุมภ์ ♒", date: "20 ม.ค. - 18 ก.พ." },
    { name: "มีน ♓", date: "19 ก.พ. - 20 มี.ค." },
  ];

  const predictions = {
    love: ["จะมีคนแอบชอบคุณ 💞", "ได้รับข้อความจากคนพิเศษ 💌", "เสน่ห์แรงมากวันนี้ ✨"],
    work: ["งานราบรื่น 💼", "เจ้านายเอ็นดู 👏", "ไอเดียใหม่ ๆ จะเกิดขึ้น 🔥"],
    money: ["มีเงินเข้ามาไม่คาดคิด 💰", "เก็บเงินอยู่ได้ดี 💖", "ระวังใช้จ่ายฟุ่มเฟือย 🛍️"],
  };

  const generate = useCallback(() => {
    if (!sign) {
      setHoroscope("🌙 กรุณาเลือกราศีก่อน");
      setLuck(null);
      return;
    }
    const text = predictions[topic][Math.floor(Math.random() * predictions[topic].length)];
    setHoroscope(text);
    setLuck(Math.floor(Math.random() * 100) + 1);
    localStorage.setItem("zodiac", sign);
  }, [sign, topic]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div className="horoscope-section">
      <label>เลือกราศีของคุณ</label>
      <select className="input" value={sign} onChange={(e) => setSign(e.target.value)}>
        <option value="">-- เลือกราศี --</option>
        {zodiacList.map((z) => (
          <option key={z.name} value={z.name}>
            {z.name} ({z.date})
          </option>
        ))}
      </select>

      <div className="horoscope-topic-bar">
        <button className={`topic-btn ${topic === "love" ? "active" : ""}`} onClick={() => setTopic("love")}>
          💞 ความรัก
        </button>
        <button className={`topic-btn ${topic === "work" ? "active" : ""}`} onClick={() => setTopic("work")}>
          💼 การงาน
        </button>
        <button className={`topic-btn ${topic === "money" ? "active" : ""}`} onClick={() => setTopic("money")}>
          💰 การเงิน
        </button>
      </div>

      <div className="horoscope-result">
        <p className="sign-title">{sign || "🌙 ยังไม่เลือกราศี"}</p>
        <p className="prediction">{horoscope}</p>
        {luck !== null && (
          <div className="luck-circle">
            <div className="luck-text">✨ โชควันนี้ {luck}%</div>
          </div>
        )}
        <button className="btn pop" onClick={generate}>
          🔁 ดูดวงใหม่อีกครั้ง
        </button>
      </div>
    </div>
  );
}

/* ✅ Add Inline */
function AddInline({ onAdd, placeholder }) {
  const [txt, setTxt] = useState("");
  return (
    <div className="add-inline">
      <input
        className="input"
        placeholder={placeholder}
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
      />
      <button
        className="btn pop"
        onClick={() => {
          if (txt.trim()) onAdd(txt.trim());
          setTxt("");
        }}
      >
        +
      </button>
    </div>
  );
}
