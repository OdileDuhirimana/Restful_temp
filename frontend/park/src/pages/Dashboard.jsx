"use client"
import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import Sidebar from "../components/common/Sidebar"
import PageContainer from "../components/common/PageContainer"
import StatusBadge from "../components/common/StatusBadge"
import { vehicleService, requestService, slotService } from "../services/entityService"
import SummaryCard from "../components/SummaryCard"
import useEntity from "../hooks/useEntity"

const Dashboard = () => {
  const navigate = useNavigate()

  // Get entity configurations
  const vehicleConfig = vehicleService.getConfig()
  const requestConfig = requestService.getConfig()
  const slotConfig = slotService.getConfig()

  // Use entity hooks to fetch data
  const { data: vehicles, loading: loadingVehicles } = useEntity(vehicleConfig.name, { limit: 5 })

  const { data: requests, loading: loadingRequests } = useEntity(requestConfig.name, { limit: 5 })

  const { data: slots, loading: loadingSlots } = useEntity(slotConfig.name, {
    initialFilters: { status: "Available" },
    limit: 5,
  })

  // Count by status
  const getCountByStatus = (items, statusField = "status", statusValue) => {
    if (!items) return 0
    return items.filter((item) => item[statusField] === statusValue).length
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <PageContainer title="Dashboard">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title={`Total ${vehicleConfig.displayNamePlural}`}
            value={vehicles?.length || 0}
            icon="car"
            color="blue"
            loading={loadingVehicles}
          />
          <SummaryCard
            title={`${requestConfig.displayNamePlural} Pending`}
            value={getCountByStatus(requests, "status", "Pending")}
            icon="ticket"
            color="amber"
            loading={loadingRequests}
          />
          <SummaryCard
            title={`Available ${slotConfig.displayNamePlural}`}
            value={getCountByStatus(slots, "status", "Available")}
            icon="check-circle"
            color="green"
            loading={loadingSlots}
          />
        </div>

        {/* Recent Items Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Vehicles */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Recent {vehicleConfig.displayNamePlural}</h2>
                <button
                  onClick={() => navigate(`/${vehicleConfig.pluralName}`)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </button>
              </div>
            </div>

            <div className="p-6">
              {loadingVehicles ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded-md"></div>
                  ))}
                </div>
              ) : vehicles?.length > 0 ? (
                <div className="space-y-4">
                  {vehicles.slice(0, 5).map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center mr-3">
                          <span className="font-bold">{vehicle.plateNumber.substring(0, 2)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{vehicle.plateNumber}</p>
                          <p className="text-sm text-gray-500">
                            {vehicle.model} ({vehicle.year})
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={vehicle.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No vehicles found</p>
                  <button
                    onClick={() => navigate(`/${vehicleConfig.pluralName}`)}
                    className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add your first {vehicleConfig.displayName.toLowerCase()}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Requests */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Recent {requestConfig.displayNamePlural}</h2>
                <button
                  onClick={() => navigate(`/${requestConfig.pluralName}`)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </button>
              </div>
            </div>

            <div className="p-6">
              {loadingRequests ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded-md"></div>
                  ))}
                </div>
              ) : requests?.length > 0 ? (
                <div className="space-y-4">
                  {requests.slice(0, 5).map((request) => (
                    <div
                      key={request.id}
                      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <div>
                        <p className="font-medium">Request #{request.id}</p>
                        <p className="text-sm text-gray-500">{new Date(request.requestDate).toLocaleDateString()}</p>
                      </div>
                      <StatusBadge status={request.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No requests found</p>
                  <button
                    onClick={() => navigate(`/${requestConfig.pluralName}`)}
                    className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create your first {requestConfig.displayName.toLowerCase()}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default Dashboard
