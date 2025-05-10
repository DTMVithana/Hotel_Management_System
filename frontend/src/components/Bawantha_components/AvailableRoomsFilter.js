import React from "react";

export default function AvailableRoomsFilter({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  acType,
  setAcType,
  bedType,
  setBedType,
  onFilter,
}) {
  return (
    <div className="flex items-center flex-wrap gap-4">
      {/* Room Search */}
      <input
        type="text"
        placeholder="Search for a room..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded w-60"
      />

      {/* Date */}
      <div className="flex items-center">
        <label className="mr-2">Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </div>

      {/* AC Type */}
      <div className="flex items-center">
        <label className="mr-2">AC Type</label>
        <select
          value={acType}
          onChange={(e) => setAcType(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="All">All</option>
          <option value="AC">AC</option>
          <option value="Non AC">Non AC</option>
        </select>
      </div>

      {/* Bed Type */}
      <div className="flex items-center">
        <label className="mr-2">Bed Type</label>
        <select
          value={bedType}
          onChange={(e) => setBedType(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="All">All</option>
          <option value="King">King</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={onFilter}
        className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}
