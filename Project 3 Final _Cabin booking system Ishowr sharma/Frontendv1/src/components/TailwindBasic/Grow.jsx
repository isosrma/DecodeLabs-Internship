import React from 'react'

function Grow() {
  return (
   <>
   <div className="flex gap-4 border p-4">
        {/* grow takes extra space */}
        <div className="grow bg-green-400 text-white p-4 text-center">grow</div>

        {/* fixed width */}
        <div className="w-32 bg-red-400 text-white p-4 text-center">fixed</div>

        {/* shrink when space is small */}
        <div className="shrink w-64 bg-purple-400 text-white p-4 text-center">
          shrink
        </div>
      </div>
      </>
  )
}

export default Grow