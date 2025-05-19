// 
const ParkingLogo = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" fill="#f8fafc" stroke="#2563eb" strokeWidth="4" />

      {/* P shape */}
      <path d="M30 25 L30 75 L40 75 L40 55 L60 55 C65 55 70 50 70 42.5 C70 35 65 30 60 30 L30 25 Z" fill="#2563eb" />

      {/* Inner cutout of P */}
      <path d="M40 35 L40 45 L55 45 C57 45 60 44 60 40 C60 36 57 35 55 35 L40 35 Z" fill="#f8fafc" />

      {/* Parking line */}
      <rect x="50" y="60" width="20" height="4" fill="#2563eb" />
      <rect x="50" y="68" width="20" height="4" fill="#2563eb" />
    </svg>
  )
}

export default ParkingLogo
