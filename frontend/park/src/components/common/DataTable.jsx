import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import StatusBadge from "./StatusBadge"

// Reusable data table component with sorting, pagination, and actions
const DataTable = ({
  data = [],
  columns = [],
  actions = [],
  pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
    onPageChange: () => {},
  },
  loading = false,
  noDataMessage = "No data available",
  onRowClick = null,
  selectedId = null,
}) => {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")

  // Handle header click for sorting
  const handleHeaderClick = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Calculate pagination info
  const { currentPage, totalItems, itemsPerPage, onPageChange } = pagination
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  // Placeholder for loading state
  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse ml-auto"></div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // If no data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
        <p className="text-gray-500">{noDataMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? "cursor-pointer" : ""}`}
                onClick={column.sortable ? () => handleHeaderClick(column.key) : undefined}
              >
                <div className="flex items-center">
                  {column.label}
                  {sortField === column.key && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((row) => (
            <tr
              key={row.id}
              className={`
                ${onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                ${selectedId === row.id ? "bg-blue-50" : ""}
                transition-colors
              `}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                  {renderCellContent(row, column)}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end space-x-3">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          action.onClick(row)
                        }}
                        className={
                          action.className ||
                          `text-${action.color || "blue"}-600 hover:text-${action.color || "blue"}-800 transition-colors`
                        }
                        title={action.label}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="text-sm text-gray-600 mb-4 sm:mb-0">
            Showing {startItem} to {endItem} of {totalItems} items
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {/* Page numbers */}
            {getPaginationNumbers(currentPage, totalPages).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  currentPage === pageNum
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-600"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper to render cell content based on column type
const renderCellContent = (row, column) => {
  const value = row[column.key]

  if (column.render) {
    return column.render(value, row)
  }

  switch (column.type) {
    case "status":
      return <StatusBadge status={value} colorMap={column.colorMap} />

    case "date":
      return value ? new Date(value).toLocaleDateString() : ""

    case "datetime":
      return value ? new Date(value).toLocaleString() : ""

    case "boolean":
      return value ? "Yes" : "No"

    case "number":
      return typeof value === "number" ? value.toLocaleString() : value

    case "currency":
      return typeof value === "number"
        ? new Intl.NumberFormat("en-US", { style: "currency", currency: column.currency || "USD" }).format(value)
        : value

    case "relation":
      return row[column.relationKey] ? row[column.relationKey][column.displayField] : ""

    default:
      return value
  }
}

// Helper to generate pagination number array
const getPaginationNumbers = (currentPage, totalPages) => {
  const MAX_PAGES_TO_SHOW = 5

  if (totalPages <= MAX_PAGES_TO_SHOW) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  let startPage = Math.max(currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2), 1)
  let endPage = startPage + MAX_PAGES_TO_SHOW - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(endPage - MAX_PAGES_TO_SHOW + 1, 1)
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
}

export default DataTable
