import { Clock, Calendar, Car, X, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const RequestTable = ({ requests, onCancel }) => {
  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: <CheckCircle className="h-4 w-4 mr-1" />,
        }
      case "Rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: <XCircle className="h-4 w-4 mr-1" />,
        }
      case "Pending":
        return {
          bg: "bg-amber-100",
          text: "text-amber-800",
          icon: <AlertCircle className="h-4 w-4 mr-1" />,
        }
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: <AlertCircle className="h-4 w-4 mr-1" />,
        }
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Request ID
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slot (if assigned)
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {requests.map((request) => {
            const statusBadge = getStatusBadge(request.status)
            return (
              <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{request.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{request.vehicle.plateNumber}</div>
                      <div className="text-sm text-gray-500">{request.vehicle.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {formatDate(request.requestDate)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      {formatTime(request.requestDate)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{getRelativeTime(request.requestDate)}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-medium rounded-full ${statusBadge.bg} ${statusBadge.text}`}
                  >
                    {statusBadge.icon}
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.slotNumber ? (
                    <span className="font-medium text-gray-900">Slot #{request.slotNumber}</span>
                  ) : (
                    <span className="text-gray-400">Not assigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {request.status === "Pending" ? (
                    <button
                      onClick={() => onCancel(request.id)}
                      className="text-red-600 hover:text-red-800 transition-colors flex items-center justify-end gap-1"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  ) : request.status === "Approved" ? (
                    <span className="text-green-600">Approved</span>
                  ) : (
                    <span className="text-gray-500">Closed</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RequestTable
