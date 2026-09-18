import React from 'react'

function ListItem() {
  return (
    <>
    <div className="flex gap-4 border p-4">
        <div className="bg-gray-400 p-4">1</div>

        {/* order-first moves this item to the beginning */}
        <div className="order-first bg-yellow-400 p-4">order-first</div>

        <div className="bg-gray-500 p-4">3</div>
      </div>
    </>
  )
}

export default ListItem