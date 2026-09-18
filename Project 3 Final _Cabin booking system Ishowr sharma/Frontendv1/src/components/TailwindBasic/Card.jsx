import React from 'react'

const Card = () => {
  return (
   <>
   {/* flex-wrap allows items to move to next row */}
      <div className="flex  gap-4 flex-wrap  border p-4 bg-gray-50">
        {/* basis controls starting width */}
        <div className="basis-48 bg-blue-400 text-white p-4">Card 1</div>

        <div className="basis-48 bg-blue-500 text-white p-4  ">Card 2</div>

        <div className="basis-48 bg-blue-600 text-white p-4  ">Card 3</div>

        <div className="basis-48 bg-blue-700 text-white p-4">Card 4</div>
        <div className="basis-48 bg-blue-700 text-white p-4">Card 5</div>
        <div className="basis-48 bg-blue-700 text-white p-4">Card 6</div>
        <div className="basis-48 bg-blue-800 text-white p-4 ">Card 7</div>
      </div></>
  )
}

export default Card