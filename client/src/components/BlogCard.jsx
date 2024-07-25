import React from 'react'

const BlogCard = ({ title, desc, writer, image }) => {
    return (
        <div className='flex border justify-start items-center w-max m-4'>
            <div className='h-48 w-40'>
                <img className='w-full h-full object-contain' src={image} alt={title} />
            </div>
            <div className='w-60 p-4 flex flex-col justify-center'>
                <div>
                    <h1 className='text-md font-bold'>{title}</h1>
                </div>
                <div>
                    <p className='text-gray-700 py-2'>{writer}</p>
                </div>
                <div className='h-20 overflow-hidden'>
                    <p className='text-sm font-extralight'>{desc}</p>
                </div>
                
            </div>
        </div>
    )
}

export default BlogCard