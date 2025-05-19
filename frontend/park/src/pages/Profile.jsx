import React from "react"
import { useState } from "react"
import { User, Mail, Phone, Lock, Edit2, Camera, Save, X } from "lucide-react"
import Sidebar from "../components/Sidebar"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [profileImage, setProfileImage] = useState(null)

  // User data state
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 15, 2023",
  })

  // Form state for editing
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  })

  // Password change form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Handle input changes for profile edit
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle input changes for password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  // Handle profile image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        setProfileImage(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  // Save profile changes
  const saveProfileChanges = () => {
    setUserData({
      ...userData,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    })
    setIsEditing(false)
  }

  // Cancel profile editing
  const cancelEditing = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    })
    setIsEditing(false)
  }

  // Save password changes
  const savePasswordChanges = () => {
    // Here you would implement password validation and API call
    console.log("Password change:", passwordData)
    setIsChangingPassword(false)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">My Profile</h1>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
                    {profileImage ? (
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={saveProfileChanges}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                        >
                          <Save className="h-4 w-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="text-sm">Edit</span>
                        </button>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-5 w-5 mr-3 text-gray-400" />
                          <span>{userData.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-5 w-5 mr-3 text-gray-400" />
                          <span>{userData.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mt-2 pt-2 border-t border-gray-100">
                          <span className="text-sm">Member since {userData.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Security Settings</h2>
            </div>

            <div className="p-6">
              {isChangingPassword ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={savePasswordChanges}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                    >
                      <Save className="h-4 w-4" />
                      Update Password
                    </button>
                    <button
                      onClick={() => setIsChangingPassword(false)}
                      className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <h3 className="text-md font-medium text-gray-900">Password</h3>
                      <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Notification Preferences</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-medium text-gray-900">Marketing Communications</h3>
                  <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
