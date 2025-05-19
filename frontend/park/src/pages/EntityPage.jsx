import Sidebar from "../components/common/Sidebar"
import GenericEntityView from "../components/common/GenericEntityView"

// Generic entity page that dynamically renders based on entity name
const EntityPage = ({
  entityName,
  customTitle = "",
  viewMode = "grid",
  showViewToggle = true,
  filterEnabled = true,
  createEnabled = true,
  editEnabled = true,
  deleteEnabled = true,
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <GenericEntityView
        entityName={entityName}
        customTitle={customTitle}
        viewMode={viewMode}
        showViewToggle={showViewToggle}
        filterEnabled={filterEnabled}
        createEnabled={createEnabled}
        editEnabled={editEnabled}
        deleteEnabled={deleteEnabled}
      />
    </div>
  )
}

export default EntityPage
