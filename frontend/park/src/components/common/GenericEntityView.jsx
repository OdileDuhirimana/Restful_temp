"use client"

import { useState, useEffect } from "react"
import { Plus, Search, X, Grid, List, Edit2, Trash2 } from "lucide-react"
import useEntity from "../../hooks/useEntity"
import PageContainer from "./PageContainer"
import DataTable from "./DataTable"
import Modal from "./Modal"
import GenericForm from "./GenericForm"
import { getServiceByName } from "../../services/entityService"

// A generic entity view component that can be used for any entity
const GenericEntityView = ({
  entityName,
  customTitle = "",
  viewMode = "table",
  showViewToggle = true,
  filterEnabled = true,
  createEnabled = true,
  editEnabled = true,
  deleteEnabled = true,
  pageSize = 10,
  onRowClick = null,
  customActions = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentViewMode, setCurrentViewMode] = useState(viewMode)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  // Get entity service and configuration
  const entityService = getServiceByName(entityName)
  const entityConfig = entityService.getConfig()
  const fields = entityService.getAllFieldDefinitions()

  // Get column definitions from entity config
  const getColumnDefinitions = () => {
    const viewConfig = entityService.getViewConfig("table")

    if (!viewConfig || !viewConfig.enabled) {
      throw new Error(`Table view not enabled for entity: ${entityName}`)
    }

    const columns = (viewConfig.defaultColumns || [])
      .filter((fieldName) => fields[fieldName])
      .map((fieldName) => {
        const field = fields[fieldName]

        return {
          key: fieldName,
          label: field.displayName || fieldName,
          type: field.type || "text",
          sortable: true,
          ...(field.type === "status" ? { colorMap: field.colors } : {}),
        }
      })

    return columns
  }

  // Use the entity hook
  const {
    data,
    loading,
    error,
    totalCount,
    pagination,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    handlePageChange,
  } = useEntity(entityName, {
    limit: pageSize,
    loadOnMount: true,
  })

  // Handle search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchData({ q: searchTerm })
      } else {
        fetchData()
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, fetchData])

  // Handle form submissions
  const handleCreate = async (formData) => {
    await createItem(formData)
    setIsCreateModalOpen(false)
  }

  const handleEdit = async (formData) => {
    await updateItem(currentItem.id, formData)
    setIsEditModalOpen(false)
    setCurrentItem(null)
  }

  const handleDelete = async () => {
    await deleteItem(currentItem.id)
    setIsDeleteModalOpen(false)
    setCurrentItem(null)
  }

  // Prepare form fields from entity config
  const getFormFields = () => {
    return Object.entries(fields)
      .filter(([_, field]) => !field.isHidden)
      .map(([name, field]) => ({
        name,
        ...field,
      }))
  }

  // Actions for the data table
  const getTableActions = () => {
    const actions = []

    if (editEnabled) {
      actions.push({
        icon: <Edit2 className="h-4 w-4" />,
        label: "Edit",
        color: "blue",
        onClick: (item) => {
          setCurrentItem(item)
          setIsEditModalOpen(true)
        },
      })
    }

    if (deleteEnabled) {
      actions.push({
        icon: <Trash2 className="h-4 w-4" />,
        label: "Delete",
        color: "red",
        onClick: (item) => {
          setCurrentItem(item)
          setIsDeleteModalOpen(true)
        },
      })
    }

    // Add custom actions
    actions.push(...customActions)

    return actions
  }

  // Render the title
  const title = customTitle || entityConfig.displayNamePlural

  // Create button
  const createButton = createEnabled && (
    <button
      onClick={() => setIsCreateModalOpen(true)}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
    >
      <Plus className="h-4 w-4" />
      <span>Add {entityConfig.displayName}</span>
    </button>
  )

  // View toggle buttons
  const viewToggleButtons = showViewToggle && (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
      <button
        onClick={() => setCurrentViewMode("grid")}
        className={`p-2 rounded-md ${
          currentViewMode === "grid"
            ? "bg-blue-50 text-blue-600"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Grid className="h-5 w-5" />
      </button>
      <button
        onClick={() => setCurrentViewMode("table")}
        className={`p-2 rounded-md ${
          currentViewMode === "table"
            ? "bg-blue-50 text-blue-600"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        }`}
      >
        <List className="h-5 w-5" />
      </button>
    </div>
  )

  return (
    <PageContainer
      title={title}
      actions={
        <>
          {viewToggleButtons}
          {createButton}
        </>
      }
    >
      {/* Search input */}
      {filterEnabled && (
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder={`Search ${entityConfig.displayNamePlural.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">{error}</div>}

      {/* Data display */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          data={data}
          columns={getColumnDefinitions()}
          actions={getTableActions()}
          pagination={{
            currentPage: pagination.page,
            totalItems: totalCount,
            itemsPerPage: pagination.limit,
            onPageChange: handlePageChange,
          }}
          loading={loading}
          noDataMessage={`No ${entityConfig.displayNamePlural.toLowerCase()} found`}
          onRowClick={onRowClick}
        />
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={`Create ${entityConfig.displayName}`}
      >
        <GenericForm
          fields={getFormFields()}
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          submitText="Create"
          loading={loading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit ${entityConfig.displayName}`}
      >
        <GenericForm
          fields={getFormFields()}
          initialValues={currentItem || {}}
          onSubmit={handleEdit}
          onCancel={() => setIsEditModalOpen(false)}
          submitText="Update"
          loading={loading}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`Delete ${entityConfig.displayName}`}
        size="sm"
      >
        <div className="mb-6">
          <p>Are you sure you want to delete this {entityConfig.displayName.toLowerCase()}?</p>
          <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </Modal>
    </PageContainer>
  )
}

export default GenericEntityView
