// src/pages/Tharinda_pages/RoomDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Simple Badge component — must be declared _before_ RoomDetailsPage
const Badge = ({ color, children }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
      color === "blue"   ? "bg-blue-100 text-blue-800"
      : color === "green" ? "bg-green-100 text-green-800"
      :                    "bg-purple-100 text-purple-800"
    }`}
  >
    {children}
  </span>
);

const RoomDetailsPage = () => {
  const { roomNumber } = useParams();
  const [room, setRoom]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // fetch all rooms
        const roomsRes    = await axios.get("http://localhost:5000/api/rooms/");
        const allRooms    = roomsRes.data.data || [];
        // fetch all bookings
        const bookingsRes = await axios.get("http://localhost:5000/api/bookings/");
        const allBookings = bookingsRes.data.data || [];

        // see if this roomNumber is booked
        const booking = allBookings.find(b => b.roomNumber === roomNumber);

        // pick booking record or room record
        const rec = booking
          ? booking
          : allRooms.find(r => r.roomNumber === roomNumber);

        if (!rec) {
          throw new Error("Room not found");
        }

        setRoom({
          ...rec,
          status:      booking ? "Booked" : "Available",
          availability: !booking,
          images:      Array.isArray(rec.images) ? rec.images : [rec.image || ""],
        });
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [roomNumber]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
  if (error) return (
    <div className="text-center text-red-600 mt-20">{error}</div>
  );

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Image + Status Badge */}
        <div className="relative h-96">
          <img
            src={room.images[0]}
            alt={`Room ${room.roomNumber}`}
            className="w-full h-full object-cover"
          />
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white ${
              room.status === "Booked" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {room.status}
          </span>
        </div>

        {/* Details */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">Room {room.roomNumber}</h1>
          <div className="flex space-x-2 mb-4">
            <Badge color="blue"> {room.roomType} </Badge>
            <Badge color="green"> {room.bedType} </Badge>
            <Badge color="purple"> {room.size} </Badge>
          </div>

          <p className="text-2xl font-semibold text-blue-600 mb-6">
            Rs. {room.price} <span className="text-sm text-gray-500">/ night</span>
          </p>

          {room.description && (
            <p className="text-gray-700 mb-6">{room.description}</p>
          )}

          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Book Now
            </button>
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
              Contact Reception
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
