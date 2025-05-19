// Update the existing mockData.jsx file with additional mock slots

export const mockVehicles = [
  {
    id: 1,
    plateNumber: "ABC-123",
    type: "Car",
    size: "Medium",
    color: "Blue",
    status: "Parked",
    model: "Toyota Camry",
    year: 2020,
  },
  {
    id: 2,
    plateNumber: "XYZ-789",
    type: "SUV",
    size: "Large",
    color: "Black",
    status: "Available",
    model: "Honda CR-V",
    year: 2021,
  },
  {
    id: 3,
    plateNumber: "DEF-456",
    type: "Motorcycle",
    size: "Small",
    color: "Red",
    status: "Pending",
    model: "Yamaha MT-07",
    year: 2022,
  },
  {
    id: 4,
    plateNumber: "GHI-789",
    type: "Truck",
    size: "Large",
    color: "White",
    status: "Available",
    model: "Ford F-150",
    year: 2019,
  },
  {
    id: 5,
    plateNumber: "JKL-012",
    type: "Car",
    size: "Medium",
    color: "Silver",
    status: "Parked",
    model: "Nissan Altima",
    year: 2020,
  },
  {
    id: 6,
    plateNumber: "MNO-345",
    type: "Car",
    size: "Small",
    color: "Green",
    status: "Available",
    model: "Honda Civic",
    year: 2021,
  },
  {
    id: 7,
    plateNumber: "PQR-678",
    type: "SUV",
    size: "Large",
    color: "Gray",
    status: "Pending",
    model: "Toyota RAV4",
    year: 2022,
  },
  {
    id: 8,
    plateNumber: "STU-901",
    type: "Motorcycle",
    size: "Small",
    color: "Yellow",
    status: "Parked",
    model: "Kawasaki Ninja",
    year: 2020,
  },
]

export const mockRequests = [
  {
    id: 1001,
    vehicle: mockVehicles[1], // XYZ-789
    requestDate: "2023-05-15T09:30:00",
    status: "Approved",
    slotNumber: "A-12",
    duration: 2, // hours
  },
  {
    id: 1002,
    vehicle: mockVehicles[3], // GHI-789
    requestDate: "2023-05-16T14:00:00",
    status: "Pending",
    slotNumber: null,
    duration: 4, // hours
  },
  {
    id: 1003,
    vehicle: mockVehicles[5], // MNO-345
    requestDate: "2023-05-14T11:15:00",
    status: "Rejected",
    slotNumber: null,
    duration: 1, // hours
    rejectionReason: "No available slots matching vehicle size",
  },
  {
    id: 1004,
    vehicle: mockVehicles[2], // DEF-456
    requestDate: "2023-05-17T08:45:00",
    status: "Pending",
    slotNumber: null,
    duration: 3, // hours
  },
  {
    id: 1005,
    vehicle: mockVehicles[1], // XYZ-789
    requestDate: "2023-05-10T16:30:00",
    status: "Approved",
    slotNumber: "B-05",
    duration: 2, // hours
  },
  {
    id: 1006,
    vehicle: mockVehicles[3], // GHI-789
    requestDate: "2023-05-12T13:00:00",
    status: "Approved",
    slotNumber: "C-22",
    duration: 6, // hours
  },
  {
    id: 1007,
    vehicle: mockVehicles[5], // MNO-345
    requestDate: "2023-05-18T10:00:00",
    status: "Pending",
    slotNumber: null,
    duration: 2, // hours
  },
]

export const mockSlots = [
  {
    id: 1,
    slotNumber: "A-01",
    size: "Medium",
    vehicleType: "Car",
    location: "Level 1, Section A",
    status: "Available",
  },
  {
    id: 2,
    slotNumber: "A-02",
    size: "Medium",
    vehicleType: "Car",
    location: "Level 1, Section A",
    status: "Unavailable",
  },
  {
    id: 3,
    slotNumber: "A-03",
    size: "Large",
    vehicleType: "SUV",
    location: "Level 1, Section A",
    status: "Available",
  },
  {
    id: 4,
    slotNumber: "A-04",
    size: "Small",
    vehicleType: "Motorcycle",
    location: "Level 1, Section A",
    status: "Available",
  },
  {
    id: 5,
    slotNumber: "B-01",
    size: "Large",
    vehicleType: "Truck",
    location: "Level 1, Section B",
    status: "Available",
  },
  {
    id: 6,
    slotNumber: "B-02",
    size: "Medium",
    vehicleType: "Car",
    location: "Level 1, Section B",
    status: "Unavailable",
  },
  {
    id: 7,
    slotNumber: "B-03",
    size: "Small",
    vehicleType: "Motorcycle",
    location: "Level 1, Section B",
    status: "Available",
  },
  {
    id: 8,
    slotNumber: "C-01",
    size: "Medium",
    vehicleType: "Car",
    location: "Level 2, Section C",
    status: "Available",
  },
  {
    id: 9,
    slotNumber: "C-02",
    size: "Large",
    vehicleType: "SUV",
    location: "Level 2, Section C",
    status: "Available",
  },
  {
    id: 10,
    slotNumber: "C-03",
    size: "Medium",
    vehicleType: "Car",
    location: "Level 2, Section C",
    status: "Unavailable",
  },
  {
    id: 11,
    slotNumber: "D-01",
    size: "Small",
    vehicleType: "Motorcycle",
    location: "Level 2, Section D",
    status: "Available",
  },
  {
    id: 12,
    slotNumber: "D-02",
    size: "Medium",
    vehicleType: "Car",
    location: "Level 2, Section D",
    status: "Available",
  },
  {
    id: 13,
    slotNumber: "D-03",
    size: "Large",
    vehicleType: "SUV",
    location: "Level 2, Section D",
    status: "Available",
  },
  {
    id: 14,
    slotNumber: "E-01",
    size: "Large",
    vehicleType: "Truck",
    location: "Level 3, Section E",
    status: "Available",
  },
  {
    id: 15,
    slotNumber: "E-02",
    size: "Medium",
    vehicleType: "Car",
    location: "Level 3, Section E",
    status: "Available",
  },
]
