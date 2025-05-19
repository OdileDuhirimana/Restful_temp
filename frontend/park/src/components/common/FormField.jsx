import React from "react"
import { Eye, EyeOff, User, Mail, Phone, Lock, Calendar, Clock, MapPin } from "lucide-react"

// A configurable form field component that renders different types of inputs
const FormField = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  options = [],
  disabled = false,
  required = false,
  icon,
  className = "",
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false)

  // Get the correct icon component
  const getIconComponent = () => {
    if (!icon) return null

    const iconMap = {
      user: <User className="h-5 w-5 text-gray-400" />,
      mail: <Mail className="h-5 w-5 text-gray-400" />,
      phone: <Phone className="h-5 w-5 text-gray-400" />,
      lock: <Lock className="h-5 w-5 text-gray-400" />,
      calendar: <Calendar className="h-5 w-5 text-gray-400" />,
      clock: <Clock className="h-5 w-5 text-gray-400" />,
      mapPin: <MapPin className="h-5 w-5 text-gray-400" />,
    }

    return iconMap[icon] || null
  }

  // Determine input classes based on error state
  const inputClasses = `${error ? "border-red-500" : "border-gray-300"} ${
    icon ? "pl-10" : "pl-4"
  } pr-4 py-2 w-full border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${className}`

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Icon display */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getIconComponent()}
          </div>
        )}

        {/* Render different input types */}
        {type === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`${inputClasses} ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
            {...props}
          >
            {!required && <option value="">Select {label || name}</option>}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`${inputClasses} min-h-[100px] ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
            {...props}
          />
        ) : type === "password" ? (
          <div className="relative">
            <input
              id={name}
              name={name}
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={`${inputClasses} pr-10 ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
              {...props}
            />
            {showPasswordToggle && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            )}
          </div>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`${inputClasses} ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
            {...props}
          />
        )}
      </div>

      {/* Error message */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default FormField
