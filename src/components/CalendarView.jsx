import React, { useState } from "react";
import "./PlannerLocal.css";

export default function CalendarView({ notes = {}, onSave }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [sticker, setSticker] = useState("🌸");
  const [showPopup, setShowPopup] = useState(false);

  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: lastDate }, (_, i) => i + 1),
  ];

  const getKey = (day) => `${currentYear}-${currentMonth + 1}-${day}`;

  const handleSave = () => {
    if (!selectedDate) return;
    const key = getKey(selectedDate);
    const newNotes = { ...notes, [key]: { text: noteText, sticker } };
    onSave(newNotes);
    setShowPopup(false);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  };

  return (
    <div className="calendar-section">
      {/* Header */}
      <div className="calendar-header">
        <button onClick={prevMonth} className="btn-nav">
          ‹
        </button>
        <h2>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={nextMonth} className="btn-nav">
          ›
        </button>
      </div>

      {/* Weekday Names */}
      <div className="calendar-grid daynames">
        {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
          <div key={d} className="calendar-dayname">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="calendar-grid month-view">
        {days.map((day, i) =>
          day ? (
            <div
              key={i}
              className={`calendar-cell ${
                selectedDate === day ? "selected" : ""
              } ${
                today.getDate() === day && today.getMonth() === currentMonth
                  ? "today"
                  : ""
              }`}
              onClick={() => {
                setSelectedDate(day);
                const key = getKey(day);
                setNoteText(notes[key]?.text || "");
                setSticker(notes[key]?.sticker || "🌸");
                setShowPopup(true);
              }}
            >
              <div className="day-number">{day}</div>
              {notes[getKey(day)] && (
                <div className="day-sticker">{notes[getKey(day)].sticker}</div>
              )}
            </div>
          ) : (
            <div key={i} className="calendar-cell empty"></div>
          )
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div
            className="note-popup card popup-animate"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>
              📔 {selectedDate} {monthNames[currentMonth]}
            </h4>
            <textarea
              className="input"
              placeholder="เขียนโน้ตของวันนี้..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <div className="sticker-select mobile-scroll">
              {["🌸", "💖", "🌼", "🧸", "🐱", "🌈", "⭐", "🍀", "☀️"].map((s) => (
                <button
                  key={s}
                  className={`sticker-btn ${sticker === s ? "active" : ""}`}
                  onClick={() => setSticker(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              <button className="btn pop" onClick={handleSave}>
                💾 บันทึก
              </button>
              <button className="btn" onClick={() => setShowPopup(false)}>
                ❌ ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
