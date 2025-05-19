"use client"

import { Car, Truck, Bike, Edit2, Trash2, MoreVertical } from "lucide-react"

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
  // Get the appropriate icon based on vehicle type
  const getVehicleIcon = () => {
    switch (vehicle.type.toLowerCase()) {
      case "car":
        return <Car className="h-6 w-6" />
      case "truck":
        return <Truck className="h-6 w-6" />
      case "motorcycle":
        return <Bike className="h-6 w-6" />
      default:
        return <Car className="h-6 w-6" />
    }
  }

  // Get the status badge color
  const getStatusColor = () => {
    switch (vehicle.status) {
      case "Parked":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-lg mr-3 ${
                vehicle.type.toLowerCase() === "car"
                  ? "bg-blue-100 text-blue-600"
                  : vehicle.type.toLowerCase() === "truck"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-green-100 text-green-600"
              }`}
            >
              {getVehicleIcon()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{vehicle.plateNumber}</h3>
              <p className="text-sm text-gray-500">
                {vehicle.model} ({vehicle.year})
              </p>
            </div>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
              title="Edit Vehicle"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"
              title="Delete Vehicle"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              title="More Options"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-md p-2">
            <p className="text-xs text-gray-500">Type</p>
            <p className="text-sm font-medium text-gray-900">{vehicle.type}</p>
          </div>
          <div className="bg-gray-50 rounded-md p-2">
            <p className="text-xs text-gray-500">Size</p>
            <p className="text-sm font-medium text-gray-900">{vehicle.size}</p>
          </div>
          <div className="bg-gray-50 rounded-md p-2">
            <p className="text-xs text-gray-500">Color</p>
            <div className="flex items-center">
              <div
                className="h-3 w-3 rounded-full mr-2 border border-gray-200"
                style={{ backgroundColor: vehicle.color.toLowerCase() }}
              ></div>
              <p className="text-sm font-medium text-gray-900">{vehicle.color}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-md p-2">
            <p className="text-xs text-gray-500">Status</p>
            <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor()}`}>
              {vehicle.status}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Request Parking Slot</button>
        </div>
      </div>
    </div>
  )
}

export default VehicleCard
