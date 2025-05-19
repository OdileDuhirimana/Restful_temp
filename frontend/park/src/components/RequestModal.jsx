"use client"

import { useState } from "react"
import { X, Calendar, Clock, Car } from "lucide-react"

const RequestModal = ({ vehicles, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    vehicleId: vehicles.length > 0 ? vehicles[0].id : "",
    requestDate: new Date().toISOString().split("T")[0], // Today's date
    requestTime: "08:00",
    duration: "1", // In hours
    notes: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  // Get available vehicles (those not currently parked)
  const availableVehicles = vehicles.filter((vehicle) => vehicle.status !== "Parked")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Request Parking Slot</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Vehicle Selection */}
            <div>
              <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Vehicle*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Car className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="vehicleId"
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {availableVehicles.length > 0 ? (
                    availableVehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.plateNumber} - {vehicle.type} ({vehicle.color})
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No available vehicles
                    </option>
                  )}
                </select>
              </div>
              {availableVehicles.length === 0 && (
                <p className="mt-1 text-sm text-red-600">
                  You don't have any available vehicles. Add a vehicle first or wait until your currently parked
                  vehicles are available.
                </p>
              )}
            </div>

            {/* Date and Time (side by side) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="requestDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="requestDate"
                    name="requestDate"
                    value={formData.requestDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} // Can't select past dates
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="requestTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Time*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="requestTime"
                    name="requestTime"
                    value={formData.requestTime}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (hours)*
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 12, 24].map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} {hours === 1 ? "hour" : "hours"}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special requirements or information..."
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={availableVehicles.length === 0}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RequestModal
