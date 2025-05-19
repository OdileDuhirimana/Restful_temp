// Configuration file for application-wide settings
const appConfig = {
  // Application metadata
  app: {
    name: "Management System",
    description: "A flexible management system template",
    version: "1.0.0",
    logo: "ParkingLogo", // Component name to use as logo
  },

  // API configuration
  api: {
    baseUrl: "http://localhost:4000/api",
    timeout: 30000, // milliseconds
    withCredentials: true,
  },

  // Authentication settings
  auth: {
    storageKey: "authToken",
    roleStorageKey: "userRole",
    defaultRedirect: "/dashboard",
    loginPath: "/",
  },

  // Feature flags
  features: {
    enableNotifications: true,
    enableThemeSwitch: false,
    enableRoleBasedAccess: true,
  },

  // UI configuration
  ui: {
    primaryColor: "blue",
    sidebarWidth: "64",
    tableRowsPerPage: [5, 10, 25],
    defaultRowsPerPage: 5,
  },
}

export default appConfig
