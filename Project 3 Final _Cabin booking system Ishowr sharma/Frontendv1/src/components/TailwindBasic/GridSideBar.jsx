import React from 'react'

const GridSideBar = () => {
  return (
    <>
    {/* first column fixed, second takes remaining space */}
      <div className="grid grid-cols-[200px_100px_2fr] border h-64">

        <div className="bg-gray-200 p-4">
          Sidebar
        </div>
        <div className="bg-blue-200 p-4">
          Sidebar
        </div>
        <div className="bg-gray-100 p-4">
          Main Content
        </div>
        </div>
        <div className="grid grid-cols-4 gap-4 border p-4">
        <div className="bg-green-400 text-white p-4 col-span-2">
          Large Card (col-span-2)
        </div>


        <div className="bg-green-500 text-white p-4">Card</div>

        <div className="bg-green-600 text-white p-4">Card</div>

        <div className="bg-green-700 text-white p-4 col-span-3">
          Wide Section (col-span-3)
        </div>

        <div className="bg-green-800 text-white p-4">Small</div>
      </div>

      {/* Rowspan  */}
      <div className="grid grid-cols-3 grid-rows-3 gap-4 border p-4 h-72">
        <div className="bg-purple-400 text-white p-4 row-span-2">
          row-span-2
        </div>

        <div className="bg-purple-500 text-white p-4">Item</div>

        <div className="bg-purple-600 text-white p-4">Item</div>

        <div className="bg-purple-700 text-white p-4">Item</div>

        <div className="bg-purple-800 text-white p-4 col-span-2">
          col-span-2
        </div>
      </div>
      {/* respomsive  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border p-4">
        <div className="bg-indigo-400 text-white p-4">Product 1</div>
        <div className="bg-indigo-500 text-white p-4">Product 2</div>
        <div className="bg-indigo-600 text-white p-4">Product 3</div>
        <div className="bg-indigo-700 text-white p-4">Product 4</div>
        <div className="bg-indigo-800 text-white p-4">Product 5</div>
      </div>

      
      <div className="grid grid-cols-3 h-40 border place-items-center bg-gray-100">
        <div className="bg-pink-400 p-4">Center</div>
        <div className="bg-pink-500 p-4">Center</div>
        <div className="bg-pink-600 p-4">Center</div>
      </div>
    


    </>
  )
}

export default GridSideBar