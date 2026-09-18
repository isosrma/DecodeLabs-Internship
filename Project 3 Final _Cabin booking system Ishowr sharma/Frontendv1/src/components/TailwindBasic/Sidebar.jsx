import React from 'react'

const Sidebar = () => {
  return (
   <>
   <div className="flex border rounded overflow-hidden h-64">
        {/* Sidebar */}
        {/* w-48 fixed width */}
        <div className="w-48 bg-gray-200 p-4">Sidebar</div>

        {/* Main content */}
        {/* flex-1 takes remaining space */}
        <div className="flex-1 bg-gray-100 p-4">Main Content (flex-1)</div>
      </div>
   </>
  )
}

export default Sidebar