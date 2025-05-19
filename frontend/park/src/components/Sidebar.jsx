"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Car, Ticket, User, LogOut, Menu, X, MapPin } from "lucide-react"
import ParkingLogo from "./parking-logo"

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-white shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-100 h-screen">
        <SidebarContent currentPath={location.pathname} />
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={toggleMobileMenu} />

          {/* Sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={toggleMobileMenu}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent currentPath={location.pathname} closeMobileMenu={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

const SidebarContent = ({ currentPath, closeMobileMenu }) => {
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "My Vehicles", icon: Car, path: "/vehicles" },
    { name: "Slot Requests", icon: Ticket, path: "/slot-requests" },
    { name: "Available Slots", icon: MapPin, path: "/available-slots" },
    { name: "Profile", icon: User, path: "/profile" },
  ]

  const isActive = (path) => {
    return currentPath === path
  }

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem("authToken")
    // Redirect to login page
    window.location.href = "/"

    if (closeMobileMenu) closeMobileMenu()
  }

  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-center p-6">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3">
            <ParkingLogo />
          </div>
          <span className="text-xl font-bold text-gray-900">ParkEase</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(item.path) ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`}
            onClick={closeMobileMenu}
          >
            <item.icon
              className={`h-5 w-5 mr-3 ${isActive(item.path) ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"}`}
            />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          className="flex w-full items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3 text-gray-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  )
}

export default Sidebar
