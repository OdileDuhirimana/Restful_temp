import { useState } from "react"
import { Search, Filter, X, MapPin } from "lucide-react"
import Sidebar from "../components/Sidebar"
import { mockSlots } from "../data/dashboard.data"

const AvailableSlots = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sizeFilter, setSizeFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Filter slots based on search term and filters
  const filteredSlots = mockSlots.filter((slot) => {
    // Only show available slots
    if (slot.status !== "Available") return false

    // Apply search filter
    const matchesSearch =
      slot.slotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Apply size filter
    const matchesSize = sizeFilter === "All" || slot.size === sizeFilter

    // Apply type filter
    const matchesType = typeFilter === "All" || slot.vehicleType === typeFilter

    return matchesSearch && matchesSize && matchesType
  })

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSlots = filteredSlots.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredSlots.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Size and type options for filters
  const sizeOptions = ["All", "Small", "Medium", "Large"]
  const typeOptions = ["All", "Car", "SUV", "Motorcycle", "Truck"]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Available Parking Slots</h1>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by slot number or location..."
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

              {/* Size Filter */}
              <div className="relative w-full md:w-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size === "All" ? "All Sizes" : size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="relative w-full md:w-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type === "All" ? "All Types" : type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Slots Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {filteredSlots.length === 0 ? (
              <div className="p-8 text-center">
                <MapPin className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No available slots found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || sizeFilter !== "All" || typeFilter !== "All"
                    ? "No slots match your search criteria. Try different filters."
                    : "There are currently no available parking slots."}
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Slot Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Vehicle Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {currentSlots.map((slot) => (
                        <tr key={slot.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {slot.slotNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{slot.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{slot.vehicleType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                              {slot.location}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                              Available
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSlots.length)} of{" "}
                      {filteredSlots.length} slots
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvailableSlots
