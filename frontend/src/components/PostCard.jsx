import React from 'react'

const PostCard = ({item}) => {
  return (
    <div className='card shadow-md border p-2 overflow-hidden rounded-[20px] m-2 '>
        <div className="box">
            <img src={`/uploads/${item.postImage}`} alt="post image" className='w-full rounded h-32'/>
        <h1 className='my-2 text-center'>{!item.postTitle?"Title":item.postTitle}</h1>
        </div>

    </div>
  )
}

export default PostCard