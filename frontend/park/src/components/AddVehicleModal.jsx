import { useState, useEffect } from "react"
import { X } from "lucide-react"

const AddVehicleModal = ({ vehicle, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    plateNumber: "",
    type: "Car",
    size: "Medium",
    color: "Blue",
    model: "",
    year: new Date().getFullYear(),
  })

  // If editing an existing vehicle, populate the form
  useEffect(() => {
    if (vehicle) {
      setFormData({
        plateNumber: vehicle.plateNumber || "",
        type: vehicle.type || "Car",
        size: vehicle.size || "Medium",
        color: vehicle.color || "Blue",
        model: vehicle.model || "",
        year: vehicle.year || new Date().getFullYear(),
      })
    }
  }, [vehicle])

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

  // Available options for dropdowns
  const vehicleTypes = ["Car", "SUV", "Truck", "Motorcycle"]
  const vehicleSizes = ["Small", "Medium", "Large"]
  const vehicleColors = ["Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Yellow"]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">{vehicle ? "Edit Vehicle" : "Add New Vehicle"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Plate Number */}
            <div>
              <label htmlFor="plateNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Plate Number*
              </label>
              <input
                type="text"
                id="plateNumber"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. ABC-123"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type*
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                Size*
              </label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {vehicleSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color*
              </label>
              <div className="relative">
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {vehicleColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute left-3 top-2.5 h-5 w-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: formData.color.toLowerCase() }}
                ></div>
              </div>
            </div>

            {/* Model and Year (side by side) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                  Model*
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Camry"
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                  Year*
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
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
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {vehicle ? "Update Vehicle" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddVehicleModal
