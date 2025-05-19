// Standardized container for pages with consistent padding and max-width
const PageContainer = ({ children, title, subtitle, actions, className = "" }) => {
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className={`max-w-7xl mx-auto p-6 sm:p-8 ${className}`}>
        {(title || actions) && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              {title && <h1 className="text-2xl font-bold text-gray-800">{title}</h1>}
              {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
            </div>

            {actions && <div className="mt-4 sm:mt-0 flex items-center gap-4">{actions}</div>}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export default PageContainer
