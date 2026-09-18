import React from 'react'

const Navbar = () => {
  return (
    <>
    <div>
        <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded">
        {/* Logo */}
        <div className="font-bold text-lg">MySite</div>

        {/* Menu */}
        {/* space-x adds horizontal spacing between items */}
        <div className="flex space-x-6">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
        </div>

        {/* Profile */}
        <div className="bg-gray-600 px-3 py-1 rounded">Profile</div>
      </div>
       
    </div>
    </>
  )
}

export default Navbar