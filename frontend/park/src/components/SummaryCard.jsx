import { Car, Ticket, CheckCircle, AlertCircle } from "lucide-react"

const SummaryCard = ({ title, value, icon, color }) => {
  // Define icon component based on the icon prop
  const getIcon = () => {
    switch (icon) {
      case "car":
        return <Car className="h-8 w-8 text-white" />
      case "ticket":
        return <Ticket className="h-8 w-8 text-white" />
      case "check-circle":
        return <CheckCircle className="h-8 w-8 text-white" />
      default:
        return <AlertCircle className="h-8 w-8 text-white" />
    }
  }

  // Define gradient background based on the color prop
  const getGradient = () => {
    switch (color) {
      case "blue":
        return "from-blue-600 to-blue-500"
      case "green":
        return "from-green-600 to-green-500"
      case "amber":
        return "from-amber-600 to-amber-500"
      case "red":
        return "from-red-600 to-red-500"
      default:
        return "from-gray-600 to-gray-500"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center h-14 w-14 rounded-lg bg-gradient-to-r ${getGradient()} mr-4 shadow-sm`}
          >
            {getIcon()}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
