"use client"

import { useState, useEffect, useCallback } from "react"
import { getServiceByName } from "../services/entityService"

// Generic hook for entity data management
const useEntity = (entityName, options = {}) => {
  const [data, setData] = useState([])
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: options.limit || 10,
  })

  // Get the entity service
  const entityService = getServiceByName(entityName)

  // Fetch data with optional filtering, sorting, and pagination
  const fetchData = useCallback(
    async (filters = {}) => {
      setLoading(true)
      setError(null)

      try {
        const params = {
          ...filters,
          _page: pagination.page,
          _limit: pagination.limit,
        }

        const response = await entityService.getAll(params)

        // Handle both array responses and paginated responses
        if (Array.isArray(response)) {
          setData(response)
          setTotalCount(response.length)
        } else if (response.data && Array.isArray(response.data)) {
          setData(response.data)
          setTotalCount(response.total || response.data.length)
        }

        return response
      } catch (error) {
        setError(error.message || "An error occurred while fetching data")
        return null
      } finally {
        setLoading(false)
      }
    },
    [entityService, pagination],
  )

  // Fetch a single item
  const fetchItem = useCallback(
    async (id) => {
      setLoading(true)
      setError(null)

      try {
        const response = await entityService.getById(id)
        setItem(response)
        return response
      } catch (error) {
        setError(error.message || "An error occurred while fetching the item")
        return null
      } finally {
        setLoading(false)
      }
    },
    [entityService],
  )

  // Create a new item
  const createItem = useCallback(
    async (data) => {
      setLoading(true)
      setError(null)

      try {
        const response = await entityService.create(data)
        fetchData() // Refresh the list
        return response
      } catch (error) {
        setError(error.message || "An error occurred while creating the item")
        return null
      } finally {
        setLoading(false)
      }
    },
    [entityService, fetchData],
  )

  // Update an existing item
  const updateItem = useCallback(
    async (id, data) => {
      setLoading(true)
      setError(null)

      try {
        const response = await entityService.update(id, data)

        // Update the current item if it's loaded
        if (item && item.id === id) {
          setItem(response)
        }

        fetchData() // Refresh the list
        return response
      } catch (error) {
        setError(error.message || "An error occurred while updating the item")
        return null
      } finally {
        setLoading(false)
      }
    },
    [entityService, fetchData, item],
  )

  // Delete an item
  const deleteItem = useCallback(
    async (id) => {
      setLoading(true)
      setError(null)

      try {
        await entityService.delete(id)

        // Clear the current item if it's the one being deleted
        if (item && item.id === id) {
          setItem(null)
        }

        fetchData() // Refresh the list
        return true
      } catch (error) {
        setError(error.message || "An error occurred while deleting the item")
        return false
      } finally {
        setLoading(false)
      }
    },
    [entityService, fetchData, item],
  )

  // Handle pagination change
  const handlePageChange = useCallback((newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }))
  }, [])

  // Handle limit change
  const handleLimitChange = useCallback((newLimit) => {
    setPagination((prev) => ({
      ...prev,
      limit: newLimit,
      page: 1, // Reset to first page when changing limit
    }))
  }, [])

  // Get entity configuration
  const getEntityConfig = useCallback(() => {
    return entityService.getConfig()
  }, [entityService])

  // Load data on mount and when pagination changes
  useEffect(() => {
    if (options.loadOnMount !== false) {
      fetchData(options.initialFilters)
    }
  }, [fetchData, options.loadOnMount, options.initialFilters, pagination.page, pagination.limit])

  return {
    data,
    item,
    loading,
    error,
    totalCount,
    pagination,
    fetchData,
    fetchItem,
    createItem,
    updateItem,
    deleteItem,
    handlePageChange,
    handleLimitChange,
    getEntityConfig,
  }
}

export default useEntity
