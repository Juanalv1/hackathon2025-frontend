import { Check } from 'lucide-react'
import { X } from 'lucide-react'
import React from 'react'


const Notification = ({ notification }) => {
  console.log(notification)
  return (
    <div className='flex px-3 py-1 rounded-lg bg-amber-200 text-amber-500 text-lg absolute top-4 right-4 items-center justify-center text-balance ml-12 text-center z-80'>
      {notification.result == "failure" && (<X className='text-red-500 w-4 h-4' />)}
      {notification.result == "success" && (<Check className='text-green-600' />)}
      <p className='ml-2'>{notification.msg}</p>
    </div>
  )
}

export default Notification
