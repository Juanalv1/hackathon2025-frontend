import React from 'react'

const Animation = ({ action }) => {
  return (
    <div className='w-12 h-12 absolute z-90 right-0 top-4'>
      {action == "eating" && (<img src='/eating.png' />)}
      {action == "scar" && (<img src='/scar.png' />)}
    </div>
  )
}

export default Animation
