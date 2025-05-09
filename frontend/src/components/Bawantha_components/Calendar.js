import React, { useState } from 'react';

const Calendar = ({ onDateSelect, selectedDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const getDaysArray = () => {
    const days = [];
    // JS getDay: 0=Sunday,... convert to Mon-first by mapping 1-7
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < offset; i++) days.push(null);
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let d = 1; d <= totalDays; d++) days.push(d);
    return days;
  };

  const isToday = (day) => {
    if (!day) return false;
    const now = new Date();
    return (
      now.getDate() === day &&
      now.getMonth() === currentMonth &&
      now.getFullYear() === currentYear
    );
  };

  const isBooked = (day) => {
    if (!day) return false;
    const iso = new Date(currentYear, currentMonth, day).toISOString().slice(0, 10);
    return selectedDates.includes(iso);
  };

  const handleClickDate = (day) => {
    if (!day) return;
    const clicked = new Date(currentYear, currentMonth, day);
    onDateSelect?.(clicked);
  };

  const days = getDaysArray();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg w-full border border-gray-200">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 shadow-sm transition">
          &lt;
        </button>
        <h3 className="font-bold text-lg text-gray-800">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button onClick={nextMonth} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 shadow-sm transition">
          &gt;
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {dayNames.map((d) => <div key={d} className="text-center">{d}</div>)}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 text-sm">
        {days.map((day, idx) => {
          const today = isToday(day);
          const booked = isBooked(day);
          const classes = [
            'flex items-center justify-center h-8 w-8 rounded-full cursor-pointer transition',
            !day ? 'invisible' : '',
            today ? 'bg-blue-500 text-white font-bold' : '',
            booked ? 'bg-red-500 text-white font-semibold' : '',
            !today && !booked ? 'hover:bg-gray-100 text-gray-700' : ''
          ].join(' ');

          return (
            <div
              key={idx}
              onClick={() => handleClickDate(day)}
              className={classes}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
