import { useState } from "react"
import { Search, Plus, Filter, X, Calendar } from "lucide-react"
import Sidebar from "../components/Sidebar"
import RequestTable from "../components/RequestTable"
import RequestModal from "../components/RequestModal"
import { mockRequests, mockVehicles } from "../data/dashboard.data"

const SlotRequests = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter requests based on search term and status filter
  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch = request.vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleNewRequest = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSaveRequest = (requestData) => {
    // In a real app, you would call an API to save the request
    console.log("Save request:", requestData)
    closeModal()
  }

  const handleCancelRequest = (requestId) => {
    // In a real app, you would call an API to cancel the request
    console.log("Cancel request with ID:", requestId)
  }

  // Status options for filter
  const statusOptions = ["All", "Pending", "Approved", "Rejected"]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Slot Requests</h1>

            {/* Request New Slot Button */}
            <button
              onClick={handleNewRequest}
              className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              <span>Request New Slot</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by vehicle plate number..."
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

              {/* Status Filter */}
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === "All" ? "All Statuses" : `${status} Requests`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {filteredRequests.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No slot requests found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || statusFilter !== "All"
                    ? "No requests match your search criteria. Try different filters."
                    : "You haven't made any slot requests yet. Click the 'Request New Slot' button to get started."}
                </p>
                {!searchTerm && statusFilter === "All" && (
                  <button
                    onClick={handleNewRequest}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Request Your First Slot</span>
                  </button>
                )}
              </div>
            ) : (
              <>
                <RequestTable requests={currentRequests} onCancel={handleCancelRequest} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRequests.length)} of{" "}
                      {filteredRequests.length} requests
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

      {/* Request Slot Modal */}
      {isModalOpen && <RequestModal vehicles={mockVehicles} onClose={closeModal} onSave={handleSaveRequest} />}
    </div>
  )
}

export default SlotRequests
