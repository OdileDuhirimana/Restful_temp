// Configuration for navigation and sidebar menu structure
const navigationConfig = {
  // Main navigation items
  mainNav: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "Home",
      roles: ["user", "admin"],
    },
    {
      name: "Primary Entity",
      path: "/vehicles",
      icon: "Car",
      roles: ["user", "admin"],
    },
    {
      name: "Secondary Entity",
      path: "/slot-requests",
      icon: "Ticket",
      roles: ["user", "admin"],
    },
    {
      name: "Available Items",
      path: "/available-slots",
      icon: "MapPin",
      roles: ["user", "admin"],
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "User",
      roles: ["user", "admin"],
    },
  ],

  // Admin-specific navigation
  adminNav: [
    {
      name: "Admin Dashboard",
      path: "/admin/dashboard",
      icon: "LayoutDashboard",
      roles: ["admin"],
    },
    {
      name: "User Management",
      path: "/admin/users",
      icon: "Users",
      roles: ["admin"],
    },
    {
      name: "System Settings",
      path: "/admin/settings",
      icon: "Settings",
      roles: ["admin"],
    },
  ],

  // Profile menu items
  profileMenu: [
    {
      name: "My Profile",
      path: "/profile",
      icon: "User",
    },
    {
      name: "Account Settings",
      path: "/settings",
      icon: "Settings",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "LogOut",
      action: "logout",
    },
  ],
}

export default navigationConfig
