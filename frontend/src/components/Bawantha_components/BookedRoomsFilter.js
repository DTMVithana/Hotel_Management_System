import React from "react";

export default function BookedRoomsFilter({
  roomNumber,
  setRoomNumber,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  onFilter
}) {
  // whenever any field changes, call onFilter immediately
  const handleRoomChange = (e) => {
    const value = e.target.value;
    setRoomNumber(value);
    onFilter({ roomNumber: value, checkInDate, checkOutDate });
  };

  const handleInDateChange = (e) => {
    const value = e.target.value;
    setCheckInDate(value);
    onFilter({ roomNumber, checkInDate: value, checkOutDate });
  };

  const handleOutDateChange = (e) => {
    const value = e.target.value;
    setCheckOutDate(value);
    onFilter({ roomNumber, checkInDate, checkOutDate: value });
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-md w-full">
      {/* Room Number */}
      <input
        type="text"
        placeholder="Search by Room Number"
        value={roomNumber}
        onChange={handleRoomChange}
        className="border border-gray-300 p-2 rounded w-60"
      />

      {/* Check-In Date */}
      <div className="flex items-center gap-1">
        <label className="font-medium text-gray-700">Check-In</label>
        <input
          type="date"
          value={checkInDate}
          onChange={handleInDateChange}
          className="border border-gray-300 p-2 rounded w-36"
        />
      </div>

      {/* Check-Out Date */}
      <div className="flex items-center gap-1">
        <label className="font-medium text-gray-700">Check-Out</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={handleOutDateChange}
          className="border border-gray-300 p-2 rounded w-36"
        />
      </div>

       {/* Search Button */}
       <button
        onClick={() => onFilter({ roomNumber, checkInDate, checkOutDate })}
        className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
     >
        Search
      </button>

    </div>
  );
}
