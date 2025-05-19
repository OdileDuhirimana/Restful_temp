"use client"
import FormField from "./FormField"
import useForm from "../../hooks/useForm"

// Generic form component that renders form fields based on entity configuration
const GenericForm = ({
  fields = [],
  initialValues = {},
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  loading = false,
}) => {
  // Prepare validation schema from fields
  const validationSchema = fields.reduce((schema, field) => {
    if (field.validation) {
      schema[field.name] = field.validation
    }
    return schema
  }, {})

  // Use the form hook
  const form = useForm(initialValues, validationSchema, async (values) => {
    await onSubmit(values)
  })

  return (
    <form onSubmit={form.handleSubmit} className="space-y-4">
      {fields.map((field) => {
        // Skip hidden fields from rendering
        if (field.isHidden) return null

        return (
          <FormField
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            label={field.displayName}
            value={form.values[field.name] || ""}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched[field.name] ? form.errors[field.name] : ""}
            placeholder={field.placeholder}
            options={field.options || []}
            disabled={field.disabled || loading}
            required={field.isRequired}
            icon={field.icon}
            showPasswordToggle={field.type === "password"}
            {...field.props}
          />
        )
      })}

      <div className="mt-6 flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {cancelText}
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !form.isValid}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {submitText}
            </span>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  )
}

export default GenericForm
