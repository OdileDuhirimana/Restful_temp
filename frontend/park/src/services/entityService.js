import apiService from "./api"
import entityConfig from "../config/entityConfig"

// Create a function that generates a service for any entity
const createEntityService = (entityName) => {
  // Find entity config
  const entityConf = Object.values(entityConfig).find((config) => config.name === entityName)

  if (!entityConf) {
    throw new Error(`Entity configuration not found for: ${entityName}`)
  }

  const baseEndpoint = `/${entityConf.pluralName}`

  return {
    // Get all records with filtering, sorting, and pagination
    getAll: async (params = {}) => {
      return apiService.getAll(baseEndpoint, params)
    },

    // Get a single record by ID
    getById: async (id) => {
      return apiService.getById(baseEndpoint, id)
    },

    // Create a new record
    create: async (data) => {
      return apiService.create(baseEndpoint, data)
    },

    // Update an existing record
    update: async (id, data) => {
      return apiService.update(baseEndpoint, id, data)
    },

    // Delete a record
    delete: async (id) => {
      return apiService.delete(baseEndpoint, id)
    },

    // Get entity configuration
    getConfig: () => {
      return entityConf
    },

    // Get field definition
    getFieldDefinition: (fieldName) => {
      return entityConf.fields[fieldName]
    },

    // Get all field definitions
    getAllFieldDefinitions: () => {
      return entityConf.fields
    },

    // Get custom views configuration
    getViewConfig: (viewName) => {
      return entityConf.views[viewName]
    },
  }
}

// Create services for each entity
const vehicleService = createEntityService("vehicle")
const requestService = createEntityService("request")
const slotService = createEntityService("slot")

// Create a registry of all services
const entityServices = {
  vehicle: vehicleService,
  request: requestService,
  slot: slotService,
}

// Helper to get a service by entity name
const getServiceByName = (entityName) => {
  if (!entityServices[entityName]) {
    throw new Error(`Service not found for entity: ${entityName}`)
  }
  return entityServices[entityName]
}

export { createEntityService, vehicleService, requestService, slotService, getServiceByName }
