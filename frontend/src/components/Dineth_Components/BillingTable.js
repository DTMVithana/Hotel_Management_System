import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const BookedRoomsTable = ({ bookedRooms, refreshBookings }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState(null);
  const navigate = useNavigate();

  // ✅ Delete Bill Handler
  const handleDeleteBill = () => {
    axios
      .delete(`http://localhost:5000/api/bills/${selectedBillId}`)
      .then(() => {
        toast.success("✅ Bill deleted successfully");
        refreshBookings();
        setShowConfirmPopup(false);
      })
      .catch((error) => {
        console.error("Error deleting bill:", error);
        toast.error("❌ Failed to delete bill");
      });
  };

  const confirmDelete = (billId) => {
    setSelectedBillId(billId);
    setShowConfirmPopup(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-2">Bill ID</th>
            <th className="border p-2">Room</th>
            <th className="border p-2">Customer NIC</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedRooms.length > 0 ? (
            [...bookedRooms]
              .sort((a, b) => b._id.localeCompare(a._id))
              .map((room) => (
                <tr
                  key={room._id}
                  className="text-center cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => navigate(`/bookings/${room._id}`)}
                >
                  <td className="border p-2">{room._id}</td>
                  <td className="border p-2">{room.roomNumber}</td>
                  <td className="border p-2">{room.nic}</td>
                  <td className="border p-2">{room.customerName}</td>

                  <td className="border p-2">
                    <div className="flex items-center justify-center gap-2 flex-nowrap">
                      <Link
                        onClick={(e) => e.stopPropagation()}
                        to={`/payment/${room._id}`}
                      >
                        <button className="bg-green-500 text-white shadow-md rounded-md px-4 py-2 hover:bg-green-600">
                          Pay
                        </button>
                      </Link>

                      <Link
                        onClick={(e) => e.stopPropagation()}
                        to={`/bills/${room._id}/edit`}
                      >
                        <button className="bg-yellow-500 text-white shadow-md rounded-md px-4 py-2 hover:bg-yellow-600">
                          Update
                        </button>
                      </Link>

                      <button
                        className="bg-red-500 text-white shadow-md rounded-md px-4 py-2 hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(room._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No booked rooms available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Bill Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this bill?
            </p>
            <div className="flex flex-row-reverse gap-4">
              <button
                onClick={handleDeleteBill}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedRoomsTable;
