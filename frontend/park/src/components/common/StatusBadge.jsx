// Configurable status badge with different colors
const StatusBadge = ({ status, colorMap = {}, icon: Icon = null, size = "default" }) => {
  // Default color map if none provided
  const defaultColorMap = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-amber-100 text-amber-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800",

    // Common status labels
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    available: "bg-green-100 text-green-800",
    unavailable: "bg-gray-100 text-gray-800",
    parked: "bg-blue-100 text-blue-800",
  }

  // Combine default and custom color maps
  const mergedColorMap = { ...defaultColorMap, ...colorMap }

  // Get the color class based on status
  const getColorClass = () => {
    const normalizedStatus = status?.toLowerCase() || "default"
    return mergedColorMap[normalizedStatus] || mergedColorMap.default
  }

  // Size classes
  const sizeClasses = {
    small: "px-2 py-0.5 text-xs",
    default: "px-3 py-1 text-xs",
    large: "px-4 py-1.5 text-sm",
  }

  return (
    <span
      className={`inline-flex items-center leading-5 font-medium rounded-full ${getColorClass()} ${sizeClasses[size] || sizeClasses.default}`}
    >
      {Icon && <Icon className="h-4 w-4 mr-1" />}
      {status}
    </span>
  )
}

export default StatusBadge
