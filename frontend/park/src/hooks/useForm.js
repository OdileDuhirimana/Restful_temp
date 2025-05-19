"use client"

import { useState, useEffect } from "react"

const useForm = (initialValues = {}, validationSchema = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValid, setIsValid] = useState(false)

  // Update form values when initialValues change (useful for edit forms)
  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  // Validate form whenever values or touched fields change
  useEffect(() => {
    const validationErrors = validate(values, validationSchema)
    const touchedErrors = Object.keys(touched).reduce((acc, key) => {
      if (touched[key] && validationErrors[key]) {
        acc[key] = validationErrors[key]
      }
      return acc
    }, {})

    setErrors(touchedErrors)
    setIsValid(Object.keys(validationErrors).length === 0)
  }, [values, touched, validationSchema])

  // Validate all fields based on schema
  const validate = (values, schema) => {
    const errors = {}

    Object.entries(schema).forEach(([field, rules]) => {
      // Handle required validation
      if (rules.required && (!values[field] || values[field] === "")) {
        errors[field] = rules.errorMessage || `${field} is required`
      }

      // Handle min length validation
      if (rules.minLength && values[field] && values[field].length < rules.minLength) {
        errors[field] = rules.errorMessages?.minLength || `${field} should be at least ${rules.minLength} characters`
      }

      // Handle max length validation
      if (rules.maxLength && values[field] && values[field].length > rules.maxLength) {
        errors[field] =
          rules.errorMessages?.maxLength || `${field} should be no more than ${rules.maxLength} characters`
      }

      // Handle pattern validation
      if (rules.pattern && values[field] && !rules.pattern.test(values[field])) {
        errors[field] = rules.errorMessages?.pattern || `${field} is invalid`
      }

      // Handle custom validation function
      if (rules.validate && typeof rules.validate === "function") {
        const customError = rules.validate(values[field], values)
        if (customError) {
          errors[field] = customError
        }
      }
    })

    return errors
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === "checkbox" ? checked : value

    setValues({
      ...values,
      [name]: fieldValue,
    })
  }

  // Handle blur event to track touched fields
  const handleBlur = (e) => {
    const { name } = e.target

    setTouched({
      ...touched,
      [name]: true,
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const validationErrors = validate(values, validationSchema)
    setErrors(validationErrors)

    // Mark all fields as touched
    const allTouched = Object.keys(validationSchema).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    // If form is valid, call the submit handler
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)

      try {
        await onSubmit(values)
      } catch (error) {
        console.error("Form submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Set a specific field value programmatically
  const setFieldValue = (field, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  // Reset the form to initial values
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  }
}

export default useForm
