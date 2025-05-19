// Configuration for data entities and their field definitions
const entityConfig = {
  // Primary entity
  primaryEntity: {
    name: "vehicle",
    pluralName: "vehicles",
    displayName: "Vehicle",
    displayNamePlural: "Vehicles",
    icon: "Car", // Icon name from lucide-react

    // Entity fields definition
    fields: {
      id: {
        type: "number",
        isPrimary: true,
        isHidden: true,
      },
      plateNumber: {
        type: "text",
        displayName: "Plate Number",
        isRequired: true,
        validation: { required: "Plate Number is required" },
      },
      type: {
        type: "select",
        displayName: "Type",
        options: ["Car", "SUV", "Truck", "Motorcycle"],
        isRequired: true,
      },
      size: {
        type: "select",
        displayName: "Size",
        options: ["Small", "Medium", "Large"],
        isRequired: true,
      },
      color: {
        type: "select",
        displayName: "Color",
        options: ["Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Yellow"],
        isRequired: true,
      },
      model: {
        type: "text",
        displayName: "Model",
        isRequired: true,
      },
      year: {
        type: "number",
        displayName: "Year",
        isRequired: true,
        defaultValue: new Date().getFullYear(),
      },
      status: {
        type: "status",
        displayName: "Status",
        options: ["Available", "Parked", "Pending"],
        colors: {
          Available: "gray",
          Parked: "green",
          Pending: "amber",
        },
        defaultValue: "Available",
      },
    },

    // Available views for this entity
    views: {
      table: {
        enabled: true,
        defaultColumns: ["plateNumber", "type", "size", "color", "status"],
      },
      grid: {
        enabled: true,
        defaultFields: ["plateNumber", "type", "model", "year", "status"],
      },
      detail: {
        enabled: true,
      },
    },
  },

  // Secondary entity (for the slot requests)
  secondaryEntity: {
    name: "request",
    pluralName: "requests",
    displayName: "Slot Request",
    displayNamePlural: "Slot Requests",
    icon: "Ticket",

    // Entity fields definition
    fields: {
      id: {
        type: "number",
        isPrimary: true,
        isHidden: true,
      },
      vehicleId: {
        type: "relation",
        displayName: "Vehicle",
        relationTo: "vehicle",
        displayField: "plateNumber",
        isRequired: true,
      },
      requestDate: {
        type: "date",
        displayName: "Date",
        isRequired: true,
      },
      requestTime: {
        type: "time",
        displayName: "Time",
        isRequired: true,
      },
      duration: {
        type: "number",
        displayName: "Duration (hours)",
        isRequired: true,
        defaultValue: 1,
      },
      status: {
        type: "status",
        displayName: "Status",
        options: ["Pending", "Approved", "Rejected"],
        colors: {
          Pending: "amber",
          Approved: "green",
          Rejected: "red",
        },
        defaultValue: "Pending",
      },
      slotNumber: {
        type: "text",
        displayName: "Slot Number",
        isRequired: false,
      },
      notes: {
        type: "textarea",
        displayName: "Notes",
        isRequired: false,
      },
    },

    // Available views for this entity
    views: {
      table: {
        enabled: true,
        defaultColumns: ["id", "vehicleId", "requestDate", "status", "slotNumber"],
      },
      detail: {
        enabled: true,
      },
    },
  },

  // Third entity (for the slots)
  tertiaryEntity: {
    name: "slot",
    pluralName: "slots",
    displayName: "Parking Slot",
    displayNamePlural: "Parking Slots",
    icon: "MapPin",

    // Entity fields definition
    fields: {
      id: {
        type: "number",
        isPrimary: true,
        isHidden: true,
      },
      slotNumber: {
        type: "text",
        displayName: "Slot Number",
        isRequired: true,
      },
      size: {
        type: "select",
        displayName: "Size",
        options: ["Small", "Medium", "Large"],
        isRequired: true,
      },
      vehicleType: {
        type: "select",
        displayName: "Vehicle Type",
        options: ["Car", "SUV", "Motorcycle", "Truck"],
        isRequired: true,
      },
      location: {
        type: "text",
        displayName: "Location",
        isRequired: true,
      },
      status: {
        type: "status",
        displayName: "Status",
        options: ["Available", "Unavailable"],
        colors: {
          Available: "green",
          Unavailable: "gray",
        },
        defaultValue: "Available",
      },
    },

    // Available views for this entity
    views: {
      table: {
        enabled: true,
        defaultColumns: ["slotNumber", "size", "vehicleType", "location", "status"],
      },
    },
  },
}

export default entityConfig
