import { useState } from "react"
import { Search, Plus, Grid, List, Car, X } from "lucide-react"
import Sidebar from "../components/Sidebar"
import VehicleCard from "../components/VehicleCard"
import VehicleTable from "../components/VehicleTable"
import AddVehicleModal from "../components/AddVehicleModal"
import { mockVehicles } from "../data/dashboard.data"

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [viewMode, setViewMode] = useState("grid") // "grid" or "table"
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [vehicleToEdit, setVehicleToEdit] = useState(null)

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

  const handleAddVehicle = () => {
    setVehicleToEdit(null)
    setIsModalOpen(true)
  }

  const handleEditVehicle = (vehicle) => {
    setVehicleToEdit(vehicle)
    setIsModalOpen(true)
  }

  const handleDeleteVehicle = (vehicleId) => {
    // In a real app, you would call an API to delete the vehicle
    console.log("Delete vehicle with ID:", vehicleId)
    // Then update the UI accordingly
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setVehicleToEdit(null)
  }

  const handleSaveVehicle = (vehicleData) => {
    if (vehicleToEdit) {
      // Update existing vehicle
      console.log("Update vehicle:", { ...vehicleToEdit, ...vehicleData })
    } else {
      // Add new vehicle
      console.log("Add new vehicle:", vehicleData)
    }
    closeModal()
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">My Vehicles</h1>

            {/* View Toggle and Add Button */}
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${
                    viewMode === "grid"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md ${
                    viewMode === "table"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={handleAddVehicle}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
              >
                <Plus className="h-4 w-4" />
                <span>Add Vehicle</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search by plate number or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Vehicles Display */}
          {filteredVehicles.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
              <Car className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? "No vehicles match your search criteria. Try a different search term."
                  : "You haven't added any vehicles yet. Click the 'Add Vehicle' button to get started."}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleAddVehicle}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Your First Vehicle</span>
                </button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onEdit={() => handleEditVehicle(vehicle)}
                  onDelete={() => handleDeleteVehicle(vehicle.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <VehicleTable vehicles={currentVehicles} onEdit={handleEditVehicle} onDelete={handleDeleteVehicle} />
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 bg-white rounded-lg shadow-sm border border-gray-100 px-6 py-4">
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

      {/* Add/Edit Vehicle Modal */}
      {isModalOpen && <AddVehicleModal vehicle={vehicleToEdit} onClose={closeModal} onSave={handleSaveVehicle} />}
    </div>
  )
}

export default Vehicles
