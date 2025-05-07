import React, { useState, useEffect } from "react";
import { Menu, User, LogOut, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserProfilePopup from "./UserProfilePopup";
import LogoutDialog from "./LogoutDialog";

const Header = ({ onSidebarToggle }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
    setShowDropdown(false);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    setShowLogoutDialog(false);
    navigate("/", { replace: true });
    window.location.reload();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleProfileClick = () => {
    setShowProfilePopup(true);
    setShowDropdown(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-700 to-blue-500 shadow-md text-white flex justify-between items-center p-4 z-50 h-16">
        <div className="flex items-center">
          <button
            onClick={onSidebarToggle}
            className="mr-4 hover:bg-white/10 p-2 rounded-full transition"
          >
            <Menu size={24} />
          </button>
          <div className="text-xl font-semibold">
            Grand Horizon <span className="text-blue-200">Hotel & Resort</span>
          </div>
        </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-white text-indigo-700 rounded-full flex items-center justify-center">
                    {currentUser.username
                      ? currentUser.username.charAt(0).toUpperCase()
                      : <User size={16} />}
                  </div>
                  <div className="text-sm font-medium hidden sm:block">
                    {currentUser.username || "User"}
                    <div className="text-xs text-blue-100">
                      {currentUser.role === "admin" ? "Administrator" : "User"}
                    </div>
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-100">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                      onClick={handleProfileClick}
                    >
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-indigo-600" />
                        Profile
                      </div>
                    </button>
                    {currentUser.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-indigo-600">
                            <rect width="7" height="9" x="3" y="3" rx="1" />
                            <rect width="7" height="5" x="14" y="3" rx="1" />
                            <rect width="7" height="9" x="14" y="12" rx="1" />
                            <rect width="7" height="5" x="3" y="16" rx="1" />
                          </svg>
                          Admin Dashboard
                        </div>
                      </Link>
                    )}
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogoutClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2 text-indigo-600" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-white hover:bg-blue-50 text-indigo-700 py-1 px-3 rounded-md transition"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>
      </header>

      {showProfilePopup && currentUser && (
        <UserProfilePopup
          user={currentUser}
          onClose={() => setShowProfilePopup(false)}
        />
      )}

      <LogoutDialog 
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Header;