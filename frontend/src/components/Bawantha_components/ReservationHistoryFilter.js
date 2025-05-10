// src/components/Bawantha_components/ReservationHistoryFilter.js
import React from "react";

export default function ReservationHistoryFilter({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onFilter
}) {
  const handleSearchChange = e => {
    const v = e.target.value;
    setSearchQuery(v);
    onFilter({ searchQuery: v, startDate, endDate });
  };
  const handleStartChange = e => {
    const v = e.target.value;
    setStartDate(v);
    onFilter({ searchQuery, startDate: v, endDate });
  };
  const handleEndChange = e => {
    const v = e.target.value;
    setEndDate(v);
    onFilter({ searchQuery, startDate, endDate: v });
  };

  return (
    <div className="flex flex-wrap items-end gap-4 bg-white p-4 rounded-lg w-full">
      {/* Free‐text */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm text-gray-600 mb-1">Search</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Name, ID, room…"
          className="w-full border p-2 rounded"
        />
      </div>
      {/* From */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">From</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartChange}
          className="border p-2 rounded"
        />
      </div>
      {/* To */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">To</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndChange}
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
}
