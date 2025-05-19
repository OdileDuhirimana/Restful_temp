"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

// Reusable modal component
const Modal = ({ isOpen, onClose, title, children, size = "md", footer = null, closeOnOutsideClick = true }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)

    // Clean up event listener
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Handle outside click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnOutsideClick) {
      onClose()
    }
  }

  // Don't render if not open
  if (!isOpen) return null

  // Size classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    full: "max-w-full",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size] || sizeClasses.md} max-h-[90vh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow">{children}</div>

        {/* Footer */}
        {footer && <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
