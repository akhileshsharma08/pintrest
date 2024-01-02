import React from 'react'

const PostCard = () => {
  return (
    <div className='card shadow-md border p-2 overflow-hidden rounded-[20px] m-2 '>
        <div className="box">
            <img src="https://imgs.search.brave.com/d-UiZQU9W9FhAAEzdCTOFpkzf9KvD8jvPjV3gZP20wE/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2I2L0lt/YWdlX2NyZWF0ZWRf/d2l0aF9hX21vYmls/ZV9waG9uZS5wbmcv/NjQwcHgtSW1hZ2Vf/Y3JlYXRlZF93aXRo/X2FfbW9iaWxlX3Bo/b25lLnBuZw" alt="post image" className='w-full rounded h-32'/>
        <h1 className='my-2 text-center'>this is sample image</h1>
        </div>

    </div>
  )
}

export default PostCard