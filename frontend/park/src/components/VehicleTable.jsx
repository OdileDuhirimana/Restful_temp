import { Edit, Trash2, MoreVertical } from "lucide-react"

const VehicleTable = ({ vehicles }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plate Number
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle Type
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Color
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vehicle.plateNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vehicle.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vehicle.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center">
                    <div
                      className="h-4 w-4 rounded-full mr-2 border border-gray-200"
                      style={{ backgroundColor: vehicle.color.toLowerCase() }}
                    ></div>
                    {vehicle.color}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                      vehicle.status === "Parked"
                        ? "bg-green-100 text-green-800"
                        : vehicle.status === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                No vehicles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default VehicleTable
