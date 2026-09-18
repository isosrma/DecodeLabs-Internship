import React from 'react'

function ListItem() {
  return (
    <>
    <div className='flex  gap-4 border p-4 align-items-center justify-center'>
        <ul>
            <li className='bg-blue-400 '>Item 1</li>
            <li className='bg-green-400 '>Item 2</li>
            <li className='bg-red-400 '>Item 3</li>
        </ul>
    </div>
    </>
  )
}

export default ListItem