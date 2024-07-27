import React from 'react'

const AddPhoto = ({ top = 0, left = 0, width = 32, height = 32, borderRadius = '50%', imageSize = 30 }) => {
  return (
    <div 
      className='bg-slate-200 flex justify-center items-center border-2 border-[#272a37] absolute cursor-pointer' 
      style={{ 
        top: `${top}px`, 
        left: `${left}px`, 
        width: `${width}px`, 
        height: `${height}px`, 
        borderRadius: borderRadius 
      }}
    >
      <img src="/assets/icons/add.png" alt="add photo" width={imageSize} height={imageSize}/>
    </div>
  )
}

export default AddPhoto
