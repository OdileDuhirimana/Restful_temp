import React from "react"
import { useState } from "react"
import { Search, Plus } from "lucide-react"
import Sidebar from "../components/Sidebar"
import SummaryCard from "../components/SummaryCard"
import VehicleTable from "../components/VehicleTable"
import { mockVehicles } from "../data/dashboard.data"
import { useVehicle } from "../hooks/useVehicles"

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const {
    vehicles,
    fetchVehicles,
    createVehicle,
    modifyVehicle,
    removeVehicle,
    loading,
    error
  } = useVehicle()

  // Filter vehicles based on search term
  const filteredVehicles = mockVehicles.filter(
    (vehicle) =>
      vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentVehicles = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard title="Vehicles Added" value={mockVehicles.length} icon="car" color="blue" />
            <SummaryCard title="Slots Requested" value={8} icon="ticket" color="amber" />
            <SummaryCard title="Slots Approved" value={5} icon="check-circle" color="green" />
          </div>

          {/* Vehicles Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-800">My Vehicles</h2>

                {/* Search and Add Vehicle */}
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search vehicles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>

                  <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md">
                    <Plus className="h-4 w-4" />
                    <span>Add New Vehicle</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Vehicles Table */}
            <VehicleTable vehicles={currentVehicles} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredVehicles.length)} of{" "}
                  {filteredVehicles.length} vehicles
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        currentPage === index + 1
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-600"
                          : "border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
